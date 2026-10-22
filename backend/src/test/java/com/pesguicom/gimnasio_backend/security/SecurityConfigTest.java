package com.pesguicom.gimnasio_backend.security;

import com.pesguicom.gimnasio_backend.service.CustomUserDetailsService;
import com.pesguicom.gimnasio_backend.service.DashboardService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private JwtService jwtService;

  @MockitoBean
  private DashboardService dashboardService;

  @MockitoBean
  private CustomUserDetailsService customUserDetailsService;

  @Test
  void dashboardSinTokenDebeRetornar401() throws Exception {
    mockMvc.perform(get("/api/dashboard"))
      .andExpect(status().isUnauthorized());
  }

  @Test
  void dashboardConUsuariosSinRolAdminDebeRetornar403() throws Exception {
    UserDetails userDetails = User.withUsername("usuario-test")
      .password("password")
      .roles("USER")
      .build();

    when(customUserDetailsService.loadUserByUsername("usuario-test")).thenReturn(userDetails);

    String token = jwtService.generateToken(userDetails);

    mockMvc.perform(get("/api/dashboard")
      .header("Authorization", "Bearer " + token))
      .andExpect(status().isForbidden());
  }

  @Test
  void dashboardConUsuarioAdminNoDebeRetornar401Ni403() throws Exception {
    UserDetails admin = User.withUsername("admin-test")
      .password("password")
      .roles("ADMIN")
      .build();

    when(customUserDetailsService.loadUserByUsername("admin-test")).thenReturn(admin);

    String token = jwtService.generateToken(admin);

    mockMvc.perform(get("/api/dashboard")
      .header("Authorization", "Bearer " + token))
      .andExpect(result -> org.junit.jupiter.api.Assertions.assertTrue(
        result.getResponse().getStatus() != 401
        && result.getResponse().getStatus() != 403,
        "El administrador no debe ser rechazado por autenticación o permisos"
      ));
  }

  @Test
  void clientesSinTokenDebeRetornar401() throws Exception {
    mockMvc.perform(get("/api/clientes"))
      .andExpect(status().isUnauthorized());
  }

  @Test
  void profesoresSinTokenDebeRetornar401() throws Exception {
    mockMvc.perform(get("/api/profesores"))
      .andExpect(status().isUnauthorized());
  }

  @Test
  void pagosSinTokenDebeRetornar401() throws Exception {
    mockMvc.perform(get("/api/pagos"))
      .andExpect(status().isUnauthorized());
  }

  @Test
  void liquidacionesSinTokenDebeRetornar401() throws Exception {
    mockMvc.perform(get("/api/liquidaciones"))
      .andExpect(status().isUnauthorized());
  }

  @Test
  void usuarioComunNoPuedeAccederAEndpointsAdministrativos() throws Exception {
    UserDetails userDetails = User.withUsername("usuario-test")
      .password("password")
      .roles("USER")
      .build();

    when(customUserDetailsService.loadUserByUsername("usuario-test")).thenReturn(userDetails);

    String token = jwtService.generateToken(userDetails);

    mockMvc.perform(get("/api/clientes")
      .header("Authorization", "Bearer " + token)).andExpect(status().isForbidden());

    mockMvc.perform(get("/api/profesores")
      .header("Authorization", "Bearer " + token)).andExpect(status().isForbidden());

    mockMvc.perform(get("/api/pagos")
      .header("Authorization", "Bearer " + token)).andExpect(status().isForbidden());

    mockMvc.perform(get("/api/liquidaciones")
      .header("Authorization", "Bearer " + token)).andExpect(status().isForbidden());
  }

  @Test
  void administradorPuedeAccederAEndpointsAdministrativos() throws Exception {
    UserDetails admin = User.withUsername("admin-test")
      .password("password")
      .roles("ADMIN")
      .build();

    when(customUserDetailsService.loadUserByUsername("admin-test")).thenReturn(admin);

    String token = jwtService.generateToken(admin);

    mockMvc.perform(get("/api/clientes")
      .header("Authorization", "Bearer " + token)).andExpect(status().isOk());

    mockMvc.perform(get("/api/profesores")
      .header("Authorization", "Bearer " + token)).andExpect(status().isOk());

    mockMvc.perform(get("/api/pagos")
      .header("Authorization", "Bearer " + token)).andExpect(status().isOk());

    mockMvc.perform(get("/api/liquidaciones")
      .header("Authorization", "Bearer " + token)).andExpect(status().isOk());
  }
}
