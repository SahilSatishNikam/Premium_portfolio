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

    @GetMapping("/about")
    public String about(Model model) {
        populateModel(model);
        return "about";
    }

    @GetMapping("/skills")
    public String skills(Model model) {
        populateModel(model);
        return "skills";
    }

    @GetMapping("/projects")
    public String projects(Model model) {
        populateModel(model);
        return "projects";
    }

    @GetMapping({"/experience", "/education"})
    public String experience(Model model) {
        populateModel(model);
        return "experience";
    }

    @GetMapping("/approach")
    public String approach(Model model) {
        populateModel(model);
        return "approach";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        populateModel(model);
        return "contact";
    }
}
