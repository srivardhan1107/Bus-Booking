package com.spring.bms;

import com.spring.bms.entity.Role;
import com.spring.bms.entity.User;
import com.spring.bms.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BmsSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(BmsSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByEmail("admin@bms.com").isEmpty()) {
				User admin = User.builder()
						.name("Admin")
						.email("admin@bms.com")
						.password(passwordEncoder.encode("admin123"))
						.role(Role.ADMIN)
						.build();
				userRepository.save(admin);
				System.out.println("Seeded Default Admin User: admin@bms.com / admin123");
			}
		};
	}
}
