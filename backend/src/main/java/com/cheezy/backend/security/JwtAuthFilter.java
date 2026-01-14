package com.cheezy.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {





    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("🧪 JWT FILTER HIT");
        System.out.println("🧪 PATH: " + request.getServletPath());
        System.out.println("🧪 AUTH HEADER: " + request.getHeader("Authorization"));

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        if (request.getServletPath().startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        try {

            String token = authHeader.substring(7);
            String username = JwtUtil.validateAndGetUsername(token);

            System.out.println("🔥 JWT VALID FOR USER: " + username);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("🔥 AUTH SET WITH ROLE_ADMIN");

            System.out.println("🧪 AUTH SET: " + SecurityContextHolder.getContext().getAuthentication());
    } catch (Exception e) {
        System.out.println("❌ JWT ERROR: " + e.getMessage());
    }
        filterChain.doFilter(request, response);
    }

}

