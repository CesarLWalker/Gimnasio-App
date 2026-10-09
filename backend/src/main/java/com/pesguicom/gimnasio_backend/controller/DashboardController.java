package com.pesguicom.gimnasio_backend.controller;

import com.pesguicom.gimnasio_backend.dto.response.DashboardResponse;
import com.pesguicom.gimnasio_backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(name = "/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

  private final DashboardService dashboardService;

  @GetMapping
  public DashboardResponse obtenerDashboard() {
    return dashboardService.obtenerResumen();
  }
}
