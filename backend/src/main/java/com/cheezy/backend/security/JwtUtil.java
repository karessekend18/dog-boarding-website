package com.cheezy.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.Base64;

public class JwtUtil {

    // 32+ byte Base64 secret (VERY IMPORTANT)
    private static final String SECRET =
            "bXktc3VwZXItc2VjcmV0LWtleS1mb3Itand0LTEyMzQ1";

    private static final Key KEY =
            Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET));

    private static final long EXPIRATION = 1000 * 60 * 60 * 24; // 24 hours

    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public static String validateAndGetUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
