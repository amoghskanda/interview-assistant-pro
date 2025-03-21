
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Upload, 
  FileText, 
  Plus, 
  Check, 
  AlertCircle, 
  X,
  File,
  Trash2,
  RefreshCw
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { mockJobDescriptions } from "@/data/mockData";

const UploadResumes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    
    // Convert FileList to array and filter for PDF files
    const newFiles = Array.from(selectedFiles).filter(
      file => file.type === 'application/pdf'
    );
    
    if (newFiles.length !== selectedFiles.length) {
      toast({
        title: "Invalid file format",
        description: "Only PDF files are accepted",
        variant: "destructive",
      });
    }
    
    setFiles(prev => [...prev, ...newFiles]);
    // Reset the input
    e.target.value = '';
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleUpload = () => {
    if (!selectedJob) {
      toast({
        title: "Job description required",
        description: "Please select a job description for these resumes",
        variant: "destructive",
      });
      return;
    }
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one resume to upload",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        toast({
          title: "Upload successful",
          description: `${files.length} resume${files.length > 1 ? 's' : ''} uploaded and being analyzed`,
        });
        setFiles([]);
        navigate("/");
      }
    }, 200);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Resumes</h1>
          <p className="text-muted-foreground mt-1">
            Upload candidate resumes for AI analysis and ranking
          </p>
        </div>
        
        {/* Upload Card */}
        <Card className="subtle-shadow animate-scale-in">
          <CardHeader>
            <CardTitle>Resume Upload</CardTitle>
            <CardDescription>
              Upload resumes in PDF format to analyze and match with job descriptions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Description Selection */}
            <div className="space-y-2">
              <Label htmlFor="job-description">Select Job Description</Label>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger id="job-description" className="w-full">
                  <SelectValue placeholder="Select the job description for these resumes" />
                </SelectTrigger>
                <SelectContent>
                  {mockJobDescriptions.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                The selected job description will be used to score and rank these candidates
              </p>
            </div>
            
            {/* File Upload Area */}
            <div>
              <Label>Upload Resumes</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">Drag & drop or click to upload</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload PDF files only (max 10MB each)
                  </p>
                </div>
              </div>
            </div>
            
            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Selected Files ({files.length})</h3>
                <div className="rounded-md border divide-y">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3">
                      <div className="flex items-center">
                        <File className="h-5 w-5 text-muted-foreground mr-2" />
                        <span className="font-medium">{file.name}</span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        disabled={uploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploading and analyzing...</span>
                  <span className="text-sm">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setFiles([]);
                setSelectedJob("");
              }}
              disabled={files.length === 0 || uploading}
            >
              Clear All
            </Button>
            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || !selectedJob || uploading}
              className="relative overflow-hidden"
            >
              {uploading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload and Analyze
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Instructions Card */}
        <Card className="subtle-shadow animate-slide-up">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  1
                </div>
                <div>
                  <p className="font-medium">Upload resumes</p>
                  <p className="text-muted-foreground text-sm">
                    Select multiple PDF resumes from your device for analysis
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  2
                </div>
                <div>
                  <p className="font-medium">AI processes the resumes</p>
                  <p className="text-muted-foreground text-sm">
                    Our AI will extract information, skills, and experience from each resume
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  3
                </div>
                <div>
                  <p className="font-medium">Candidates are scored</p>
                  <p className="text-muted-foreground text-sm">
                    Each candidate is assigned a match score based on the job description requirements
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  4
                </div>
                <div>
                  <p className="font-medium">Review results</p>
                  <p className="text-muted-foreground text-sm">
                    Review candidate profiles, rankings, and send assessment tests to top candidates
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UploadResumes;
