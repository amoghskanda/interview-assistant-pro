
import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Users,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { mockJobDescriptions } from "@/data/mockData";

const JobDescriptions = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter job descriptions based on search
  const filteredJobs = mockJobDescriptions.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Descriptions</h1>
            <p className="text-muted-foreground mt-1">
              Manage and create job descriptions for candidate matching
            </p>
          </div>
          
          <Button className="sm:w-auto w-full" onClick={() => {
            toast({
              title: "Coming soon",
              description: "This feature will be available in the next update",
            });
          }}>
            <Plus className="h-4 w-4 mr-2" />
            New Job Description
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search job descriptions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover-lift subtle-shadow animate-scale-in">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {job.department} • {job.location}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Edit job description",
                          description: "This feature will be available soon",
                        });
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Delete job description",
                          description: "This feature will be available soon",
                        });
                      }} className="text-red-500 focus:text-red-500">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-3 mb-4">
                  {job.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>
                        {job.candidates?.length || 0} candidate{(job.candidates?.length || 0) !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {job.requirements.slice(0, 3).map((req, index) => {
                      // Extract the main skill from the requirement
                      const skill = req.split(" ")[0].replace(/[+]/, "");
                      return (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      );
                    })}
                    {job.requirements.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "View candidates",
                      description: "Navigate to the dashboard to view candidates for this job",
                    });
                  }}
                >
                  View Candidates
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default JobDescriptions;
