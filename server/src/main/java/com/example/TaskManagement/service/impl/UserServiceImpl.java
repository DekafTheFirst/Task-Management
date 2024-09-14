package com.example.TaskManagement.service.impl;

import com.example.TaskManagement.dto.*;
import com.example.TaskManagement.models.*;
import com.example.TaskManagement.repository.UserRepository;
import com.example.TaskManagement.service.TaskService;
import com.example.TaskManagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final TaskService taskService;

    
    @Override
    public JwtResponse getUserById(Integer id) {
        User user =  userRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("User not found"));
        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setId(user.getId());
        jwtResponse.setFirstname(user.getFirstname());
        jwtResponse.setLastname(user.getLastname());
        jwtResponse.setEmail(user.getEmail());
        jwtResponse.setCreatedAt(user.getCreatedAt());
        jwtResponse.setTasks(taskResponseList(user.getTasks()));
        jwtResponse.setProjects(projectTaskResponseList(user.getProjects()));

        return jwtResponse;
    }

    

    @Override
    public List<JwtResponse> getAllUsers() {
        List<User> users= userRepository.findAll();
        List<JwtResponse> jwtResponseList = new ArrayList<>();
        for (User user: users) {
            JwtResponse jwtResponse = new JwtResponse();
            jwtResponse.setId(user.getId());
            jwtResponse.setFirstname(user.getFirstname());
            jwtResponse.setLastname(user.getLastname());
            jwtResponse.setEmail(user.getEmail());
            jwtResponse.setTasks(taskResponseList(user.getTasks()));
            jwtResponse.setProjects(projectTaskResponseList(user.getProjects()));
            jwtResponseList.add(jwtResponse);
        }
        return jwtResponseList;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    

    



    public TaskResponse getTaskResponse(Task task) {
        TaskResponse taskResponse = new TaskResponse();

        taskResponse.setId(task.getId());
        taskResponse.setTaskname(task.getTaskname());
        taskResponse.setPriority(task.getPriority().name());
        taskResponse.setDeadline(task.getDeadline());
        taskResponse.setStatus(task.getStatus().name());
        taskResponse.setCreatedAt(task.getCreatedAt());
        taskResponse.setUpdatedAt(task.getUpdatedAt());
        taskResponse.setTaskProjects(projectResponseList(task.getTaskProjects()));

        return taskResponse;
    }

    public List<ProjectResponse> projectResponseList(List<Project> projects) {
        List<ProjectResponse> projectResponseList = new ArrayList<>();
        for (Project project: projects) {
            projectResponseList.add(getProjectResponse(project));
        }
        return projectResponseList;
    }

    public ProjectResponse getProjectResponse(Project project) {
        ProjectResponse projectResponse = new ProjectResponse();

        projectResponse.setId(project.getId());
        projectResponse.setProjectname(project.getProjectname());
        projectResponse.setDescription(project.getDescription());
        projectResponse.setDeadline(project.getDeadline());
        projectResponse.setCreatedAt(project.getCreatedAt());
        projectResponse.setUpdatedAt(project.getUpdatedAt());

        return projectResponse;
    }

    public List<TaskResponse> taskResponseList(List<Task> tasks) {
        List<TaskResponse> taskResponseList = new ArrayList<>();
        for (Task task: tasks) {
            taskResponseList.add(getTaskResponse(task));
        }
        return taskResponseList;
    }
    public List<ProjectTaskResponse> projectTaskResponseList(List<Project> projects) {
        List<ProjectTaskResponse> projectTaskResponseList = new ArrayList<>();
        for (Project project: projects) {
            projectTaskResponseList.add(getProjectTaskResponse(project));
        }
        return projectTaskResponseList;
    }

    public ProjectTaskResponse getProjectTaskResponse(Project project) {
        ProjectTaskResponse projectTaskResponse = new ProjectTaskResponse();

        projectTaskResponse.setId(project.getId());
        projectTaskResponse.setProjectname(project.getProjectname());
        projectTaskResponse.setDescription(project.getDescription());
        projectTaskResponse.setDeadline(project.getDeadline());
        projectTaskResponse.setCreatedAt(project.getCreatedAt());
        projectTaskResponse.setUpdatedAt(project.getUpdatedAt());

        List<TaskProjectResponse> taskProjectResponseList = taskService.taskProjectResponseList(project.getProjectTasks());

        projectTaskResponse.setProjectTasks(taskProjectResponseList);


        return projectTaskResponse;
    }



    


}