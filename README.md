# StudyMate

**StudyMate** is a platform for students to create and manage study groups efficiently. With a robust permission system, students can request new study groups, and designated admins have the authority to approve, edit, or delete groups. This ensures an organized, safe, and collaborative learning environment.

## Features

- **Study Group Creation & Requests:**
  - Students can submit requests to create new study groups.
  - Admins review, approve, or deny these requests following platform rules.
- **Admin Controls:**
  - Admins can edit or delete existing study groups to maintain order and quality.
  - Role-based access: Only admins have moderation powers.
- **Group Management:**
  - View active and pending study groups.
  - Join study groups after approval.
- **Custom Rules:**
  - Requesters must follow guidelines (such as purpose, description, and participant limits) when requesting a new group.
  - Admins ensure compliance before approving.
- **User-Friendly Interface:**
  - Clear distinction between admin and user actions.
  - Modular, scalable codebase for future expansion.

## Tech Stack

- **Frontend:** React (TypeScript)
- **Styling:** TailwindCSS, PostCSS
- **Build Tool:** Vite
- **Linting:** ESLint
- **Other:** Custom context and service layers for state management and approvals

## Folder Structure

```
/
├── src
│   ├── components      # Reusable UI elements (forms, lists, dialogs)
│   ├── contexts        # Auth and permissions logic
│   ├── mock            # Mock data for testing (sample users, groups)
│   ├── pages           # Application views (Login, Groups, Admin Panel)
│   ├── services        # API/service layer (group requests, approvals)
│   ├── types           # TypeScript models
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # React entrypoint
│   ├── index.css       # Global styles
│   ├── vite-env.d.ts   # Vite environment typings
├── index.html          # Entry template
...
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Lint and format code:**
   ```bash
   npm run lint
   ```

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss your proposal.

## License

MIT License

---

*You can enrich this README further with usage examples, screenshots, or details about the rules and admin approval logic as needed.*
