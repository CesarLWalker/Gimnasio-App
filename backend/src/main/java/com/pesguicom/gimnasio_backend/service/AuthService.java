package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.LoginRequest;
import com.pesguicom.gimnasio_backend.dto.response.LoginResponse;
import com.pesguicom.gimnasio_backend.security.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final long expirationMs;

  public AuthService(
    AuthenticationManager authenticationManager,
    JwtService jwtService,
    @Value("${app.jwt.expiration-ms}") long expirationMs) {
    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
    this.expirationMs = expirationMs;
  }

  public LoginResponse loginResponse(LoginRequest request) {

    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(request.username(), request.password())
    );

    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
      assert userDetails != null;
      String token = jwtService.generateToken(userDetails);

    return new LoginResponse(
      token, "Bearer", expirationMs / 1000);
  }
}
