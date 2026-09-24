import { AdminHeader } from "@/components/AdminHeader";
import { ProjectForm } from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <AdminHeader
        title="Add New Development"
        description="Enter property specs, floor plans, landmarks, and upload R2 imagery."
      />
      <div className="p-8 max-w-5xl mx-auto">
        <ProjectForm isEditing={false} />
      </div>
    </div>
  );
}
