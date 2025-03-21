
import { useState } from "react";
import { 
  ClipboardCheck, 
  Plus, 
  Search, 
  Code, 
  Brain, 
  Users, 
  Clock,
  MoreHorizontal,
  Copy,
  Trash2
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { mockTestQuestions } from "@/data/mockData";
import { TestQuestion } from "@/types";

const TestManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tests");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Group questions by type
  const aptitudeQuestions = mockTestQuestions.filter(q => q.type === 'multiple_choice');
  const codingQuestions = mockTestQuestions.filter(q => q.type === 'coding');
  
  // Create mock test data
  const mockTests = [
    {
      id: "test1",
      name: "Frontend Developer Assessment",
      description: "General assessment for frontend developer candidates",
      type: "aptitude",
      questions: 15,
      timeLimitMinutes: 45,
      sentCount: 12,
      completedCount: 8
    },
    {
      id: "test2",
      name: "React Coding Challenge",
      description: "Coding challenges focusing on React components and hooks",
      type: "coding",
      questions: 3,
      timeLimitMinutes: 90,
      sentCount: 5,
      completedCount: 3
    },
    {
      id: "test3",
      name: "Frontend Fundamentals",
      description: "Test covering HTML, CSS, and JavaScript fundamentals",
      type: "aptitude",
      questions: 20,
      timeLimitMinutes: 30,
      sentCount: 18,
      completedCount: 15
    }
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Candidate Tests</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage assessment tests for candidates
            </p>
          </div>
          
          <Button className="sm:w-auto w-full" onClick={() => {
            toast({
              title: "Coming soon",
              description: "This feature will be available in the next update",
            });
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Test
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="tests">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Tests
            </TabsTrigger>
            <TabsTrigger value="questions">
              <Brain className="h-4 w-4 mr-2" />
              Question Bank
            </TabsTrigger>
          </TabsList>
          
          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6 animate-fade-in">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTests.map((test) => (
                <Card key={test.id} className="hover-lift subtle-shadow animate-scale-in">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{test.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {test.description}
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
                              title: "Coming soon",
                              description: "This feature will be available in the next update",
                            });
                          }}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            toast({
                              title: "Coming soon",
                              description: "This feature will be available in the next update",
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
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Type</span>
                          <Badge className={
                            test.type === 'aptitude' 
                              ? 'bg-purple-500/10 text-purple-600 border-purple-500/10'
                              : 'bg-blue-500/10 text-blue-600 border-blue-500/10'
                          }>
                            {test.type === 'aptitude' ? 'Aptitude' : 'Coding'}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Questions</span>
                          <span className="text-sm">{test.questions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Time Limit</span>
                          <span className="text-sm">{test.timeLimitMinutes} minutes</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>
                            {test.sentCount} sent
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {test.completedCount} completed
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Coming soon",
                          description: "This feature will be available in the next update",
                        });
                      }}
                    >
                      Send to Candidate
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Question Bank Tab */}
          <TabsContent value="questions" className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative sm:flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="sm:w-auto w-full"
                onClick={() => {
                  toast({
                    title: "Coming soon",
                    description: "This feature will be available in the next update",
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-3 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-500" />
                  Aptitude Questions ({aptitudeQuestions.length})
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {aptitudeQuestions.map((question) => (
                    <Card key={question.id} className="subtle-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/10 mb-2">
                            {question.difficulty}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                toast({
                                  title: "Coming soon",
                                  description: "This feature will be available in the next update",
                                });
                              }}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                toast({
                                  title: "Coming soon",
                                  description: "This feature will be available in the next update",
                                });
                              }} className="text-red-500 focus:text-red-500">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-base">{question.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {question.options && (
                          <div className="space-y-2">
                            {question.options.map((option, idx) => (
                              <div 
                                key={idx} 
                                className={`p-2 rounded-md border text-sm ${
                                  question.correctAnswer === idx 
                                    ? 'border-green-500 bg-green-500/5' 
                                    : 'border-muted'
                                }`}
                              >
                                {option} {question.correctAnswer === idx && ' (Correct)'}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-3 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-500" />
                  Coding Questions ({codingQuestions.length})
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {codingQuestions.map((question) => (
                    <Card key={question.id} className="subtle-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/10 mb-2">
                            {question.difficulty}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                toast({
                                  title: "Coming soon",
                                  description: "This feature will be available in the next update",
                                });
                              }}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                toast({
                                  title: "Coming soon",
                                  description: "This feature will be available in the next update",
                                });
                              }} className="text-red-500 focus:text-red-500">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-base">{question.question}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TestManagement;
