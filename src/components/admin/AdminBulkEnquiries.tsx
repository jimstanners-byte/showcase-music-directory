'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  useBulkEnquiries, 
  useApproveBulkEnquiry, 
  useRejectBulkEnquiry,
  BulkEnquiry 
} from '@/hooks/useBulkEnquiries';
import { 
  Mail, 
  Check, 
  X, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Building2,
  User,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';

export default function AdminBulkEnquiries() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const { data: enquiries, isLoading, error } = useBulkEnquiries(activeTab);
  
  const [selectedEnquiry, setSelectedEnquiry] = useState<BulkEnquiry | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const approveMutation = useApproveBulkEnquiry();
  const rejectMutation = useRejectBulkEnquiry();

  const handleApprove = async () => {
    if (!selectedEnquiry) return;
    await approveMutation.mutateAsync(selectedEnquiry.id);
    setShowApproveDialog(false);
    setSelectedEnquiry(null);
  };

  const handleReject = async () => {
    if (!selectedEnquiry || rejectionReason.trim().length < 10) return;
    await rejectMutation.mutateAsync({
      enquiryId: selectedEnquiry.id,
      rejectionReason: rejectionReason.trim(),
    });
    setShowRejectDialog(false);
    setSelectedEnquiry(null);
    setRejectionReason('');
  };

  const openApproveDialog = (enquiry: BulkEnquiry) => {
    setSelectedEnquiry(enquiry);
    setShowApproveDialog(true);
  };

  const openRejectDialog = (enquiry: BulkEnquiry) => {
    setSelectedEnquiry(enquiry);
    setRejectionReason('');
    setShowRejectDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500"><Check className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Bulk Enquiries</h1>
        <p className="text-muted-foreground">
          Review and manage bulk contact requests from users
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <Check className="h-4 w-4" />
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            <X className="h-4 w-4" />
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card>
              <CardContent className="p-6 text-center text-destructive">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>Error loading enquiries</p>
              </CardContent>
            </Card>
          ) : enquiries?.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No {activeTab} enquiries</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {enquiries?.map(enquiry => (
                <Card key={enquiry.id}>
                  <Collapsible
                    open={expandedId === enquiry.id}
                    onOpenChange={(open) => setExpandedId(open ? enquiry.id : null)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <CardTitle className="text-lg">{enquiry.sender_name}</CardTitle>
                            {getStatusBadge(enquiry.status)}
                          </div>
                          <CardDescription className="flex items-center gap-4 mt-1 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {enquiry.sender_email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {enquiry.listing_names.length} companies
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(enquiry.submitted_at), 'dd MMM yyyy HH:mm')}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {enquiry.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => openApproveDialog(enquiry)}
                                disabled={approveMutation.isPending}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => openRejectDialog(enquiry)}
                                disabled={rejectMutation.isPending}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              {expandedId === enquiry.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0 space-y-4">
                        {/* Companies List */}
                        <div>
                          <Label className="text-sm font-medium">Companies ({enquiry.listing_names.length})</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {enquiry.listing_names.map((name, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {name}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <Label className="text-sm font-medium">Message</Label>
                          <div className="mt-2 p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                            {enquiry.message}
                          </div>
                        </div>

                        {/* Rejection reason (if rejected) */}
                        {enquiry.status === 'rejected' && enquiry.rejection_reason && (
                          <div>
                            <Label className="text-sm font-medium text-destructive">Rejection Reason</Label>
                            <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm">
                              {enquiry.rejection_reason}
                            </div>
                          </div>
                        )}

                        {/* Review info (if reviewed) */}
                        {enquiry.reviewed_at && (
                          <div className="text-xs text-muted-foreground pt-2 border-t">
                            Reviewed on {format(new Date(enquiry.reviewed_at), 'dd MMM yyyy HH:mm')}
                          </div>
                        )}
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Bulk Enquiry</DialogTitle>
            <DialogDescription>
              This will send the enquiry to {selectedEnquiry?.listing_names.length} companies 
              and notify the sender that their message has been approved.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEnquiry && (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm"><strong>From:</strong> {selectedEnquiry.sender_name}</p>
                <p className="text-sm"><strong>To:</strong> {selectedEnquiry.listing_names.join(', ')}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} disabled={approveMutation.isPending}>
              {approveMutation.isPending ? 'Approving...' : 'Approve & Send Emails'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Bulk Enquiry</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this enquiry. 
              The sender will be notified with this reason.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="rejectionReason">Rejection Reason *</Label>
              <Textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please explain why this enquiry cannot be approved..."
                rows={4}
                minLength={10}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 10 characters ({rejectionReason.length}/10)
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject} 
              disabled={rejectMutation.isPending || rejectionReason.trim().length < 10}
            >
              {rejectMutation.isPending ? 'Rejecting...' : 'Reject Enquiry'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
