package com.pesguicom.gimnasio_backend.config;

import com.pesguicom.gimnasio_backend.entity.Usuario;
import com.pesguicom.gimnasio_backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

  @Bean
  public CommandLineRunner crearAdministrador(
    UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {

    return args -> {
      if (usuarioRepository.findByUsername("admin").isEmpty()) {

        Usuario admin = Usuario.builder()
          .username("admin")
          .password(passwordEncoder.encode("Cambiar123!"))
          .rol("ADMIN")
          .activo(true)
          .build();

        usuarioRepository.save(admin);
      }
    };
  }
}
