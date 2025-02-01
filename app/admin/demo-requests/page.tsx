// // app/admin/page.tsx
// "use client";
// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from '@/hooks/use-toast';
// import { fetchWithErrorHandling } from '@/app/libs/api';

// interface DemoRequest {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   status: string;
//   createdAt: string;
// }

// const API_URL = '/api/demo'

// export default function AdminDashboard() {
//   const [requests, setRequests] = useState<DemoRequest[]>([]);
//   const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const response = await fetchWithErrorHandling(`${API_URL}/demo-requests`);
//       const data = await response
//       setRequests(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch demo requests",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleApprove = async () => {
//     try {
//       const response = await fetchWithErrorHandling(`${API_URL}/approve-demo`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: selectedRequest?._id,
//           ...credentials
//         }),
//       });

//       if (response.ok) {
//         toast({
//           title: "Success",
//           description: "Demo request approved and credentials sent",
//         });
//         setIsDialogOpen(false);
//         fetchRequests();
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to approve demo request",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <Card>
//         <CardHeader>
//           <CardTitle>Demo Requests Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {requests.map((request) => (
//                 <TableRow key={request._id}>
//                   <TableCell>{request.name}</TableCell>
//                   <TableCell>{request.email}</TableCell>
//                   <TableCell>{request.phone}</TableCell>
//                   <TableCell>{request.status}</TableCell>
//                   <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     {request.status === 'pending' && (
//                       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                         <DialogTrigger asChild>
//                           <Button
//                             onClick={() => setSelectedRequest(request)}
//                             variant="outline"
//                           >
//                             Approve
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                           <DialogHeader>
//                             <DialogTitle>Set Demo Credentials</DialogTitle>
//                           </DialogHeader>
//                           <div className="space-y-4 py-4">
//                             <div className="space-y-2">
//                               <Label>Username</Label>
//                               <Input
//                                 value={credentials.username}
//                                 onChange={(e) => setCredentials(prev => ({
//                                   ...prev,
//                                   username: e.target.value
//                                 }))}
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label>Password</Label>
//                               <Input
//                                 value={credentials.password}
//                                 onChange={(e) => setCredentials(prev => ({
//                                   ...prev,
//                                   password: e.target.value
//                                 }))}
//                               />
//                             </div>
//                             <Button onClick={handleApprove}>
//                               Send Credentials
//                             </Button>
//                           </div>
//                         </DialogContent>
//                       </Dialog>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// app/admin/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchWithErrorHandling } from '@/app/libs/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Eye, Trash, Check, X } from 'lucide-react';

interface DemoRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  company?: string;
  notes?: string;
}

const API_URL = '/api/demo';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithErrorHandling(`${API_URL}/demo-requests`);
      setRequests(response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch demo requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      const response = await fetchWithErrorHandling(`${API_URL}/approve-demo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedRequest?._id,
          ...credentials
        }),
      });

      toast({
        title: "Success",
        description: "Demo request approved and credentials sent",
      });
      setIsApprovalDialogOpen(false);
      fetchRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve demo request",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await fetchWithErrorHandling(`${API_URL}/reject-demo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      toast({
        title: "Success",
        description: "Demo request rejected",
      });
      fetchRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject demo request",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await fetchWithErrorHandling(`${API_URL}/delete-demo`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedRequest?._id }),
      });

      toast({
        title: "Success",
        description: "Demo request deleted",
      });
      setIsDeleteDialogOpen(false);
      fetchRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete demo request",
        variant: "destructive",
      });
    }
  };

  const filteredRequests = requests.filter(request => 
    statusFilter === 'all' ? true : request.status === statusFilter
  );

  const openApprovalDialog = (request: DemoRequest) => {
    setSelectedRequest(request);
    setCredentials({ username: '', password: '' });
    setIsApprovalDialogOpen(true);
  };

  const openDeleteDialog = (request: DemoRequest) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
  };

  const openDetailsDialog = (request: DemoRequest) => {
    setSelectedRequest(request);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Demo Requests Management</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.phone}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDetailsDialog(request)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openApprovalDialog(request)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleReject(request._id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(request)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Approval Dialog */}
          <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Demo Credentials</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({
                      ...prev,
                      username: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}
                  />
                </div>
                <Button 
                  onClick={handleApprove}
                  className="w-full"
                >
                  Send Credentials
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the demo request from {selectedRequest?.name}?
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="mt-1">{selectedRequest?.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="mt-1">{selectedRequest?.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="mt-1">{selectedRequest?.phone}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p className="mt-1">{selectedRequest?.status}</p>
                  </div>
                  <div>
                    <Label>Company</Label>
                    <p className="mt-1">{selectedRequest?.company || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Date</Label>
                    <p className="mt-1">
                      {selectedRequest?.createdAt 
                        ? new Date(selectedRequest.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                <div>
                  <Label>Notes</Label>
                  <p className="mt-1">{selectedRequest?.notes || 'No notes available'}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}