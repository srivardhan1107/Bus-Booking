package com.spring.bms.controller;



import com.spring.bms.dto.UserDto;
import com.spring.bms.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

  
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {

        UserDto savedUser = userService.saveUser(userDto);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Get User By Id
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {

        UserDto userDto = userService.getUserById(id);

        return ResponseEntity.ok(userDto);
    }

   
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {

        List<UserDto> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @RequestBody UserDto userDto) {

        UserDto updatedUser = userService.updateUser(id, userDto);

        return ResponseEntity.ok(updatedUser);
    }

 
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok("User Deleted Successfully");
    }
}
