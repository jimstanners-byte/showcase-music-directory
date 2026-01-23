'use client';

import { useState, useEffect } from "react";
import { useSiteSetting, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Mail, Settings } from "lucide-react";

export default function AdminSettings() {
  const { data: bccSetting, isLoading } = useSiteSetting("bcc_email");
  const updateSetting = useUpdateSiteSetting();
  const { toast } = useToast();

  const [bccEmail, setBccEmail] = useState("");

  useEffect(() => {
    if (bccSetting?.value) {
      setBccEmail(bccSetting.value);
    }
  }, [bccSetting]);

  const handleSaveBcc = async () => {
    try {
      await updateSetting.mutateAsync({
        key: "bcc_email",
        value: bccEmail.trim(),
      });
      toast({
        title: "Settings saved",
        description: "BCC email has been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving setting:", error);
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Settings
        </h1>
        <p className="text-muted-foreground">Configure site-wide settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Form Settings
          </CardTitle>
          <CardDescription>
            Configure how the contact form works across the site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading settings...
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="bcc-email">BCC Email Address</Label>
                <Input
                  id="bcc-email"
                  type="email"
                  placeholder="admin@showcase-music.com"
                  value={bccEmail}
                  onChange={(e) => setBccEmail(e.target.value)}
                  className="max-w-md"
                />
                <p className="text-sm text-muted-foreground">
                  All contact form submissions will be copied to this email address. 
                  This allows you to monitor all enquiries sent through the site.
                </p>
              </div>

              <Button 
                onClick={handleSaveBcc} 
                disabled={updateSetting.isPending}
              >
                {updateSetting.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spam Protection</CardTitle>
          <CardDescription>
            Built-in spam protection features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
              <div>
                <p className="font-medium">Honeypot Field</p>
                <p className="text-muted-foreground">Hidden field that traps automated bots</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
              <div>
                <p className="font-medium">Time-based Validation</p>
                <p className="text-muted-foreground">Rejects forms submitted faster than 3 seconds</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
              <div>
                <p className="font-medium">Rate Limiting</p>
                <p className="text-muted-foreground">Maximum 5 messages per IP address per hour</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
