# GEMINI.md - Smart Recipe Box (AiTutor)

This file provides instructional context for Gemini CLI when working on the Smart Recipe Box application.

## Project Overview

The **Smart Recipe Box** is a modern Angular application designed to help users manage and scale recipes. It serves as a learning project for mastering Modern Angular features.

- **Framework**: Angular v21+ (Current version: 21.1.0)
- **Primary Paradigms**:
    - **Standalone Components**: No `NgModules`. All components are standalone.
    - **Signals**: used for state management (`signal`, `computed`, `input`).
    - **Built-in Control Flow**: Using `@if`, `@for`, and `@switch` in templates.
    - **Modern CLI Conventions**: Component files are named `<name>.ts`, `<name>.html`, etc. (omitting the `.component` suffix).
- **Styling**: Tailwind CSS v4.
- **Testing**: Vitest for unit testing.

## Building and Running

Commands should be run from the project root.

- **Development Server**: `npm start` or `ng serve` (Available at `http://localhost:4200`)
- **Build**: `npm run build` or `ng build`
- **Unit Tests**: `npm test` or `ng test`
- **Code Scaffolding**: `ng generate component <name>` or `ng generate service <name>`

## Project Structure

- `src/app/`: Contains the core application logic.
    - `app.ts`: The root standalone component.
    - `models.ts`: Shared TypeScript interfaces and types.
    - `mock-recipes.ts`: Static mock data for development.
    - `recipe-list/`: Component for displaying and navigating the list of recipes.
    - `recipe-detail/`: (Planned/In Progress) Component for displaying detailed recipe information and scaling servings.
- `src/styles.css`: Global styles (includes Tailwind imports).

## Development Conventions

- **Component Architecture**: Prefer small, focused standalone components.
- **State Management**: Use Signals for all reactive state. Avoid imperative state updates where `computed` signals can be used.
- **Naming Conventions**:
    - Component Files: `<name>.ts`, `<name>.html`, `<name>.css`.
    - Component Classes: `<Name>` (e.g., `RecipeList`, not `RecipeListComponent`).
    - Service Classes: `<Name>` (e.g., `Recipe`, not `RecipeService`).
- **Encapsulation**: Use `protected` for properties and methods accessed in templates. Use `readonly` for signals and injected dependencies.
- **Imports**: Always use relative paths for local files (e.g., `import { ... } from '../models'`).
- **Accessibility**: Follow WCAG 2.2 Level AA standards. Use semantic HTML and proper ARIA bindings.

## AI Tutor Context

This project is part of a guided tutorial.
- **Current Phase**: Phase 3: Component Architecture
- **Current Module**: Module 9: Component Inputs with Signals
- **Current Goal**: Refactoring `RecipeList` into a parent-child relationship with `RecipeDetail`.
