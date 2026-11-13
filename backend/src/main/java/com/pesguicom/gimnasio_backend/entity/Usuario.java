package com.pesguicom.gimnasio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 100)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false, length = 30)
  private String rol;

  @Column(nullable = false)
  @Builder.Default
  private Boolean activo = true;
}
