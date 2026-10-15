package com.pesguicom.gimnasio_backend.config;

import com.pesguicom.gimnasio_backend.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

  private final CustomUserDetailsService userDetailsService;

  public SecurityConfig(CustomUserDetailsService userDetailsService) {
    this.userDetailsService = userDetailsService;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

    httpSecurity
      .userDetailsService(userDetailsService)
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/clientes/**")
        .hasRole("ADMIN")
        .requestMatchers("/api/profesores/**")
        .hasRole("ADMIN")
        .requestMatchers("/api/pagos/**")
        .hasRole("ADMIN")
        .requestMatchers("/api/liquidaciones/**")
        .hasRole("ADMIN")
        .requestMatchers("/api/dashboard/", "/api/dashboard/**")
        .hasRole("ADMIN")
        .requestMatchers(HttpMethod.POST, "/api/horas-trabajadas")
        .hasRole("ADMIN")
        .requestMatchers(HttpMethod.PUT, "/api/horas-trabajadas/**")
        .hasRole("ADMIN")
        .requestMatchers(HttpMethod.DELETE, "/api/horas-trabajadas/**")
        .hasRole("ADMIN")
        .requestMatchers("/api/horas-trabajadas/**")
        .hasRole("ADMIN")
        .anyRequest()
        .authenticated())
      .httpBasic(Customizer.withDefaults())
      .csrf(AbstractHttpConfigurer::disable);
    return httpSecurity.build();
  }

}
