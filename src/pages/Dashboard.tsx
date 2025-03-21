
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart4, 
  Users, 
  FileText, 
  Upload, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { mockJobDescriptions, mockCandidates } from "@/data/mockData";
import { Candidate, JobDescription } from "@/types";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<string>(mockJobDescriptions[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const currentJob = mockJobDescriptions.find(job => job.id === selectedJob) || mockJobDescriptions[0];
  const candidates = currentJob.candidates || [];
  
  // Filter candidates based on search query
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Sort candidates by match score (highest first)
  const sortedCandidates = [...filteredCandidates].sort((a, b) => b.matchScore - a.matchScore);

  // Stats
  const testsSent = candidates.filter(c => 
    c.tests?.some(t => t.status === 'sent' || t.status === 'completed')
  ).length;
  
  const testsCompleted = candidates.filter(c => 
    c.tests?.some(t => t.status === 'completed')
  ).length;

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your candidate pipeline and hiring progress
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-lift subtle-shadow animate-slide-up" style={{animationDelay: "0.1s"}}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Candidates</p>
                  <h3 className="text-2xl font-bold">{candidates.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift subtle-shadow animate-slide-up" style={{animationDelay: "0.2s"}}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <BarChart4 className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Match Score</p>
                  <h3 className="text-2xl font-bold">
                    {candidates.length ? 
                      Math.round(candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidates.length) + "%" : 
                      "N/A"}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift subtle-shadow animate-slide-up" style={{animationDelay: "0.3s"}}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tests Sent</p>
                  <h3 className="text-2xl font-bold">{testsSent}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift subtle-shadow animate-slide-up" style={{animationDelay: "0.4s"}}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tests Completed</p>
                  <h3 className="text-2xl font-bold">{testsCompleted}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Selection and Search */}
        <Card className="subtle-shadow animate-fade-in">
          <CardHeader>
            <CardTitle>Candidate Rankings</CardTitle>
            <CardDescription>
              View candidates ranked by their match score for each job description
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Job Description" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockJobDescriptions.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates or skills..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
                <div className="col-span-5 md:col-span-3">Candidate</div>
                <div className="col-span-3 hidden md:block">Skills</div>
                <div className="col-span-4 md:col-span-3">Match Score</div>
                <div className="col-span-3 md:col-span-2">Status</div>
                <div className="col-span-0 md:col-span-1"></div>
              </div>
              
              <div className="divide-y">
                {sortedCandidates.length > 0 ? (
                  sortedCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="grid grid-cols-12 p-4 items-center hover:bg-muted/30 transition-colors"
                    >
                      <div className="col-span-5 md:col-span-3 flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="truncate">
                          <p className="font-medium truncate">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{candidate.email}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-3 hidden md:block">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-span-4 md:col-span-3">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{candidate.matchScore}%</div>
                          <Progress 
                            value={candidate.matchScore} 
                            className="h-2"
                            indicatorClassName={
                              candidate.matchScore >= 85 ? "bg-green-500" :
                              candidate.matchScore >= 70 ? "bg-amber-500" :
                              "bg-gray-500"
                            }
                          />
                        </div>
                      </div>
                      
                      <div className="col-span-3 md:col-span-2">
                        {candidate.tests && candidate.tests.length > 0 ? (
                          candidate.tests.some(t => t.status === 'completed') ? (
                            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                              Test completed
                            </Badge>
                          ) : candidate.tests.some(t => t.status === 'sent') ? (
                            <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20">
                              Test sent
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 border-gray-500/20">
                              Test pending
                            </Badge>
                          )
                        ) : (
                          <Badge variant="outline" className="bg-transparent">
                            No tests
                          </Badge>
                        )}
                      </div>
                      
                      <div className="col-span-0 md:col-span-1 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/candidate/${candidate.id}`)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <h3 className="font-medium">No candidates found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your search or upload more resumes
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          <Button 
            variant="outline" 
            className="h-auto py-6 gap-4 justify-start hover-lift subtle-shadow"
            onClick={() => navigate("/upload")}
          >
            <Upload className="h-6 w-6 text-primary" />
            <div className="text-left">
              <p className="font-medium">Upload Resumes</p>
              <p className="text-sm text-muted-foreground">Add new candidates to the pipeline</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-6 gap-4 justify-start hover-lift subtle-shadow"
            onClick={() => navigate("/jobs")}
          >
            <FileText className="h-6 w-6 text-primary" />
            <div className="text-left">
              <p className="font-medium">Manage Job Descriptions</p>
              <p className="text-sm text-muted-foreground">Create or edit job descriptions</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-6 gap-4 justify-start hover-lift subtle-shadow"
            onClick={() => navigate("/tests")}
          >
            <CheckCircle className="h-6 w-6 text-primary" />
            <div className="text-left">
              <p className="font-medium">Candidate Tests</p>
              <p className="text-sm text-muted-foreground">Create and manage assessment tests</p>
            </div>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
