// import React from 'react';
import { Button } from 'antd';

const ExportGist = ({ completedTodos, inCompletedTodos }) => {
    // Check if completedTodos and inCompletedTodos are arrays and not undefined
    if (!Array.isArray(completedTodos)) {
        console.error("completedTodos should be an array");
        return null;
    }

    if (!Array.isArray(inCompletedTodos)) {
        console.error("inCompletedTodos should be an array");
        return null;
    }

    const handleExport = () => {
        // Create the summary content
        const summaryContent = `
      Summary:
      - Completed Tasks: ${completedTodos.length}
      - Pending Tasks: ${inCompletedTodos.length}
      - Total Tasks: ${completedTodos.length + inCompletedTodos.length}
    `;

        // Simulate exporting the gist (for now, we'll log it)
        console.log("Exporting Gist:", summaryContent);

        // Add additional logic here for creating an actual Gist if needed
    };

    return (
        <Button type="primary" onClick={handleExport}>
            Export Summary as Secret Gist
        </Button>
    );
};

export default ExportGist;
