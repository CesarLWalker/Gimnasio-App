package com.pesguicom.gimnasio_backend.config;

import com.pesguicom.gimnasio_backend.security.JwtAuthenticationFilter;
import com.pesguicom.gimnasio_backend.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

  private final CustomUserDetailsService userDetailsService;
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  public SecurityConfig(CustomUserDetailsService userDetailsService,
                        JwtAuthenticationFilter jwtAuthenticationFilter) {
    this.userDetailsService = userDetailsService;
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(
    AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOrigins(List.of(
      "http://localhost:4200",
      "http://localhost:8100"
    ));

    configuration.setAllowedMethods(List.of(
      "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
    ));

    configuration.setAllowedHeaders(List.of(
      "Authorization", "Content-Type"
    ));

    configuration.setAllowCredentials(false);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", configuration);
    return source;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

    httpSecurity
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      .userDetailsService(userDetailsService)
      .csrf(AbstractHttpConfigurer::disable)
      .exceptionHandling(exceptions -> exceptions
        .authenticationEntryPoint((request, response, authException) ->
          response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No autenticado"))
          .accessDeniedHandler((request, response, accessDeniedException) ->
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Acceso denegado")))
      .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/auth/**").permitAll()
        .requestMatchers("/api/clientes/**").hasRole("ADMIN")
        .requestMatchers("/api/profesores/**").hasRole("ADMIN")
        .requestMatchers("/api/pagos/**").hasRole("ADMIN")
        .requestMatchers("/api/liquidaciones/**").hasRole("ADMIN")
        .requestMatchers("/api/dashboard", "/api/dashboard/", "/api/dashboard/**").hasRole("ADMIN")
        .requestMatchers(HttpMethod.POST, "/api/horas-trabajadas").hasRole("ADMIN")
        .requestMatchers(HttpMethod.PUT, "/api/horas-trabajadas/**").hasRole("ADMIN")
        .requestMatchers(HttpMethod.DELETE, "/api/horas-trabajadas/**").hasRole("ADMIN")
        .requestMatchers("/api/horas-trabajadas/**").hasRole("ADMIN")
        .anyRequest()
        .authenticated())
      .addFilterBefore(
        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return httpSecurity.build();
  }
}
