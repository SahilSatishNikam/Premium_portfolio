package com.portfolio.controller;

import com.portfolio.service.PortfolioDataService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    private final PortfolioDataService portfolioDataService;

    public HomeController(PortfolioDataService portfolioDataService) {
        this.portfolioDataService = portfolioDataService;
    }

    private void populateModel(Model model) {
        model.addAttribute("profile", portfolioDataService.getProfileData());
        model.addAttribute("projects", portfolioDataService.getProjects());
        model.addAttribute("skillsByCategory", portfolioDataService.getSkillsByCategory());
        model.addAttribute("experiences", portfolioDataService.getExperience());
        model.addAttribute("approaches", portfolioDataService.getDevelopmentApproach());
        model.addAttribute("eduCert", portfolioDataService.getEducationAndCertification());
    }

    @GetMapping({"/", "/home"})
    public String index(Model model) {
        populateModel(model);
        return "index";
    }

    @GetMapping({"/about", "/skills", "/projects", "/experience", "/approach", "/education", "/contact"})
    public String sectionRoute(jakarta.servlet.http.HttpServletRequest request, Model model) {
        populateModel(model);
        String path = request.getRequestURI();
        if (path.startsWith("/")) {
            path = path.substring(1);
        }
        model.addAttribute("activeSection", path);
        return "index";
    }
}
