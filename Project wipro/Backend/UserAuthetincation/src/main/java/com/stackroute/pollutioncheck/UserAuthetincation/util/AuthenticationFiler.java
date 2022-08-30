package com.stackroute.pollutioncheck.UserAuthetincation.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.stackroute.pollutioncheck.UserAuthetincation.model.User;
import com.stackroute.pollutioncheck.UserAuthetincation.servicce.UserAuthServiceImpl;

public class AuthenticationFiler implements Filter {

    @Autowired
    private UserAuthServiceImpl service;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        System.out.println(httpResponse.getHeader("token"));

        String token = httpRequest.getHeader("token");
        System.out.println(httpRequest.getContentType());
        System.out.println("***inside filter request method=" + httpRequest.getMethod() + "url=" + httpRequest.getRequestURL() + " token=" + token);
        try {
            User user = service.authenticateByToken(token);
            httpRequest.setAttribute("username", user.getEmail());
            chain.doFilter(httpRequest, httpResponse);
            return;
        } catch (Exception e) {
            PrintWriter writer = httpResponse.getWriter();
            writer.write("invalid toke, You are unauthorized !");
            int statusCode = HttpStatus.UNAUTHORIZED.value();
            httpResponse.setStatus(statusCode);
        }

    }
}
