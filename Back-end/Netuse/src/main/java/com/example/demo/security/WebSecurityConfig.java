package com.example.demo.security;

import com.example.demo.models.ERole;
import com.example.demo.security.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.security.jwt.AuthEntryPointJwt;
import com.example.demo.security.services.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        // securedEnabled = true,
        // jsr250Enabled = true,
        prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers("/api/auth/**").permitAll()
                //.authorizeRequests().antMatchers("/tickets**").permitAll()
                .antMatchers("/").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers("/admin/**").hasAuthority(String.valueOf(ERole.ROLE_ADMIN))
                .antMatchers("/admin/**").hasAuthority(String.valueOf(ERole.ROLE_MODERATOR))
                .antMatchers("/technicien/**").hasAuthority(String.valueOf(ERole.ROLE_TECHNICIEN))
                .antMatchers("/home/**").hasAuthority(String.valueOf((ERole.ROLE_USER)))
                .antMatchers("/technicien/**").permitAll()
                .antMatchers("/upload/**").permitAll()

                .antMatchers("/users/**").permitAll()

                .antMatchers("/tickets").permitAll()
                .antMatchers("/contacts").permitAll()
                .antMatchers("/feedback").permitAll()
                .antMatchers("api/test//**").permitAll()
                .antMatchers("/tickets/**").permitAll()
                .antMatchers("/chercherUsersTechenicien/**").permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
