
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Award,
  Calendar,
  Clock,
  ChevronRight,
  AlertCircle,
  Send,
  Download
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { mockCandidates, mockJobDescriptions } from "@/data/mockData";
import { Candidate, JobDescription } from "@/types";

const CandidateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Find candidate and related job descriptions
  const candidate = mockCandidates.find(c => c.id === id);
  const relatedJobs = mockJobDescriptions.filter(
    job => job.candidates?.some(c => c.id === id)
  );
  
  if (!candidate) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Candidate Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The candidate you're looking for doesn't exist or has been removed
          </p>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      </Layout>
    );
  }
  
  const sendTest = (type: 'aptitude' | 'coding') => {
    toast({
      title: "Test invitation sent",
      description: `A ${type} test has been sent to ${candidate.name}`,
      duration: 5000,
    });
  };
  
  const downloadResume = () => {
    toast({
      title: "Resume download started",
      description: "The resume will be downloaded to your device",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header with back button */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)} 
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Candidate Profile</h1>
        </div>

        {/* Profile Header */}
        <Card className="subtle-shadow overflow-hidden animate-scale-in">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/20"></div>
            <div className="absolute -bottom-12 left-8">
              <Avatar className="h-24 w-24 ring-4 ring-background">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <CardContent className="pt-14 pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{candidate.name}</h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 mt-1 text-muted-foreground">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{candidate.email}</span>
                  </div>
                  {candidate.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{candidate.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={downloadResume}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                
                <Button 
                  className="bg-primary/90 hover:bg-primary"
                  onClick={() => {
                    // Open test selection modal or navigate to test creation
                    toast({
                      title: "Coming soon",
                      description: "This feature will be available in the next update",
                    });
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Test
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="matches">Job Matches</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Skills */}
              <Card className="col-span-1 subtle-shadow animate-slide-up" style={{animationDelay: "0.1s"}}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/10">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="col-span-1 md:col-span-2 subtle-shadow animate-slide-up" style={{animationDelay: "0.2s"}}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-primary/30 pl-4 pb-4 relative">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                        <h4 className="font-semibold text-base">{edu.institution}</h4>
                        <p className="text-muted-foreground">{edu.degree} in {edu.field}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Work Experience */}
              <Card className="col-span-1 md:col-span-3 subtle-shadow animate-slide-up" style={{animationDelay: "0.3s"}}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-primary" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary/30 pl-4 pb-4 relative">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <h4 className="font-semibold text-base">{exp.company}</h4>
                          <div className="flex items-center text-sm text-muted-foreground md:ml-4">
                            <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                            <span>
                              {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground font-medium">{exp.position}</p>
                        <p className="mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Job Matches Tab */}
          <TabsContent value="matches" className="space-y-6 animate-fade-in">
            <Card className="subtle-shadow">
              <CardHeader>
                <CardTitle>Job Match Analysis</CardTitle>
                <CardDescription>
                  See how this candidate matches with different job descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {relatedJobs.length > 0 ? (
                  <div className="space-y-6">
                    {relatedJobs.map((job) => {
                      const jobCandidate = job.candidates?.find(c => c.id === id);
                      if (!jobCandidate) return null;
                      
                      return (
                        <div key={job.id} className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.department} • {job.location}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Overall Match</span>
                                <span className="font-semibold">{jobCandidate.matchScore}%</span>
                              </div>
                              <Progress 
                                value={jobCandidate.matchScore} 
                                className="h-2.5"
                                indicatorClassName={
                                  jobCandidate.matchScore >= 85 ? "bg-green-500" :
                                  jobCandidate.matchScore >= 70 ? "bg-amber-500" :
                                  "bg-gray-500"
                                }
                              />
                              
                              <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Skills Match</span>
                                  <span className="text-sm font-medium">
                                    {Math.round(jobCandidate.matchScore * 0.9)}%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Experience Match</span>
                                  <span className="text-sm font-medium">
                                    {Math.round(jobCandidate.matchScore * 1.1)}%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Education Match</span>
                                  <span className="text-sm font-medium">
                                    {Math.round(jobCandidate.matchScore * 0.95)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Key Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, index) => {
                                  // Determine if candidate matches this requirement (simplified)
                                  const matches = jobCandidate.skills.some(skill => 
                                    req.toLowerCase().includes(skill.toLowerCase())
                                  );
                                  
                                  return (
                                    <li 
                                      key={index}
                                      className="flex items-start"
                                    >
                                      <span className={`flex-shrink-0 h-5 w-5 rounded-full ${matches ? 'bg-green-500/20 text-green-600' : 'bg-gray-200 text-gray-500'} flex items-center justify-center mr-2 mt-0.5`}>
                                        {matches ? '✓' : '!'}
                                      </span>
                                      <span className="text-sm">{req}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                          
                          <Separator />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <h3 className="font-medium">No job matches found</h3>
                    <p className="text-muted-foreground mt-1">
                      This candidate hasn't been matched with any job descriptions yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6 animate-fade-in">
            <Card className="subtle-shadow">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                  <CardTitle>Assessment Tests</CardTitle>
                  <CardDescription>
                    Manage and review assessment tests for this candidate
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => sendTest('aptitude')}
                  >
                    Send Aptitude Test
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => sendTest('coding')}
                  >
                    Send Coding Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {candidate.tests && candidate.tests.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
                      <div className="col-span-5">Test Name</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Score</div>
                      <div className="col-span-1"></div>
                    </div>
                    
                    <div className="divide-y">
                      {candidate.tests.map((test) => (
                        <div
                          key={test.id}
                          className="grid grid-cols-12 p-4 items-center hover:bg-muted/30 transition-colors"
                        >
                          <div className="col-span-5 flex items-center">
                            <div className="font-medium">{test.name}</div>
                          </div>
                          
                          <div className="col-span-2">
                            <Badge variant="outline" className="capitalize">
                              {test.type}
                            </Badge>
                          </div>
                          
                          <div className="col-span-2">
                            <Badge
                              className={
                                test.status === 'completed' ? 'bg-green-500/10 text-green-600 border-green-500/10' :
                                test.status === 'sent' ? 'bg-amber-500/10 text-amber-600 border-amber-500/10' :
                                'bg-gray-500/10 text-gray-600 border-gray-500/10'
                              }
                            >
                              {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="col-span-2">
                            {test.score ? `${test.score}%` : '-'}
                          </div>
                          
                          <div className="col-span-1 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                toast({
                                  title: "Coming soon",
                                  description: "Test details will be available in the next update",
                                });
                              }}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <h3 className="font-medium">No tests found</h3>
                    <p className="text-muted-foreground mt-1">
                      This candidate hasn't taken any assessment tests yet
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => sendTest('aptitude')}
                    >
                      Send First Test
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CandidateProfile;
