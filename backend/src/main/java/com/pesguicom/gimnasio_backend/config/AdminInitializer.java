package com.pesguicom.gimnasio_backend.config;

import com.pesguicom.gimnasio_backend.entity.Usuario;
import com.pesguicom.gimnasio_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

  @Value("${app.admin.username}")
  private String adminUsername;

  @Value("${app.admin.password}")
  private String adminPassword;

  @Bean
  public CommandLineRunner crearAdministrador(
    UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {

    return args -> {
      if (usuarioRepository.findByUsername(adminUsername).isEmpty()) {

        Usuario admin = Usuario.builder()
          .username(adminUsername)
          .password(passwordEncoder.encode(adminPassword))
          .rol("ADMIN")
          .activo(true)
          .build();

        usuarioRepository.save(admin);
      }
    };
  }
}
