"use client"
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Reply, FileText, Trash2, Search, Filter, Eye, AlertCircle } from 'lucide-react';
import { GrievanceService, Grievance } from '@/app/libs/grievanceApi';

// Validation Schema
const replySchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

const GrievanceList: React.FC = () => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Reply Form
  const replyForm = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      subject: "",
      message: ""
    }
  });

  // Fetch Grievances
  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const data = await GrievanceService.fetchAll();
      setGrievances(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fetch failed');
      setLoading(false);
    }
  };

  // Filter and Search
  const filteredGrievances = grievances
    .filter(grievance => {
      const matchesSearch =
        grievance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grievance.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (grievance.issue?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "read" && grievance.isRead) ||
        (statusFilter === "unread" && !grievance.isRead);

      return matchesSearch && matchesStatus;
    });

  // Send Email Reply
  const handleSendReply = async (grievance: Grievance, values: z.infer<typeof replySchema>) => {
    try {
      await GrievanceService.sendReply({
        to: grievance.email,
        subject: values.subject,
        body: values.message,
        grievanceId: grievance._id
      });

      await GrievanceService.markAsRead(grievance._id);

      setGrievances(prev =>
        prev.map(g => g._id === grievance._id
          ? { ...g, isRead: true }
          : g
        )
      );

      replyForm.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reply failed');
    }
  };

  // Delete Grievance
  const handleDelete = async () => {
    if (!selectedGrievance) return;

    try {
      await GrievanceService.delete(selectedGrievance._id);
      setGrievances(prev => prev.filter(g => g._id !== selectedGrievance._id));
      setIsDeleteDialogOpen(false);
      setSelectedGrievance(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  // Toggle Read Status
  const toggleReadStatus = async (grievance: Grievance) => {
    try {
      if (grievance.isRead) {
        await GrievanceService.markAsUnread(grievance._id);
      } else {
        await GrievanceService.markAsRead(grievance._id);
      }

      setGrievances(prev =>
        prev.map(g => g._id === grievance._id
          ? { ...g, isRead: !g.isRead }
          : g
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Status update failed');
    }
  };

  // Render Loading
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-22 w-22 border-t-2 border-blue-500"></div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Grievance Management</CardTitle>
            <CardDescription>
              Total Grievances: {grievances.length} | Unread: {grievances.filter(g => !g.isRead).length}
            </CardDescription>
          </div>
          {error && (
            <div className="flex items-center text-red-500">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search grievances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredGrievances.map(grievance => (
          <Card key={grievance._id} className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{grievance.name}</CardTitle>
                <CardDescription>{grievance.email}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant={grievance.isRead ? "secondary" : "destructive"}
                  className="cursor-pointer"
                  onClick={() => toggleReadStatus(grievance)}
                >
                  {grievance.isRead ? "Read" : "Unread"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="line-clamp-2"><strong>Issue:</strong> {grievance.issue}</p>
                {grievance.suggestion && (
                  <p className="line-clamp-2"><strong>Suggestion:</strong> {grievance.suggestion}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedGrievance(grievance);
                    setIsDetailsDialogOpen(true);
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Reply className="mr-2 h-4 w-4" /> Reply
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reply to Grievance</DialogTitle>
                    </DialogHeader>
                    <Form {...replyForm}>
                      <form
                        onSubmit={replyForm.handleSubmit((values) =>
                          handleSendReply(grievance, values)
                        )}
                        className="space-y-4"
                      >
                        <FormField
                          control={replyForm.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Grievance Response"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={replyForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Write your response..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button type="submit">
                            <Send className="mr-2 h-4 w-4" /> Send Reply
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedGrievance(grievance);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this grievance from {selectedGrievance?.name}?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Grievance Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel>Name</FormLabel>
                  <p className="mt-1">{selectedGrievance?.name}</p>
                </div>
                <div>
                  <FormLabel>Email</FormLabel>
                  <p className="mt-1">{selectedGrievance?.email}</p>
                </div>
              </div>
              <div>
                <FormLabel>Issue</FormLabel>
                <p className="mt-1">{selectedGrievance?.issue}</p>
              </div>
              {selectedGrievance?.suggestion && (
                <div>
                  <FormLabel>Suggestion</FormLabel>
                  <p className="mt-1">{selectedGrievance.suggestion}</p>
                </div>
              )}
              <div>
                <FormLabel>Status</FormLabel>
                <Badge variant={selectedGrievance?.isRead ? "secondary" : "destructive"}>
                  {selectedGrievance?.isRead ? "Read" : "Unread"}
                </Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default GrievanceList;