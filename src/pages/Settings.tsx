import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import { BlogSettings, Redirect } from "@/types/blog";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState<BlogSettings>({
    siteTitle: "My Awesome Blog",
    siteDescription: "A blog about web development and technology",
    defaultMetaTitle: "My Awesome Blog - Web Development & Technology",
    defaultMetaDescription: "Latest articles about web development, programming, and technology trends",
    defaultKeywords: "web development, programming, technology, blog",
    defaultRobots: "index, follow"
  });

  const [redirects, setRedirects] = useState<Redirect[]>([
    {
      oldSlug: "old-post-url",
      newSlug: "new-post-url",
      type: "301",
      created: new Date()
    }
  ]);

  const [newRedirect, setNewRedirect] = useState({
    oldSlug: "",
    newSlug: "",
    type: "301" as "301" | "302"
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSettingsChange = (field: keyof BlogSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // In real app, this would save to Supabase
      console.log('Saving settings:', settings);
      toast({
        title: "Settings saved!",
        description: "Your blog settings have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addRedirect = () => {
    if (newRedirect.oldSlug && newRedirect.newSlug) {
      setRedirects(prev => [...prev, {
        ...newRedirect,
        created: new Date()
      }]);
      setNewRedirect({ oldSlug: "", newSlug: "", type: "301" });
      toast({
        title: "Redirect added!",
        description: "The redirect rule has been created.",
      });
    }
  };

  const removeRedirect = (index: number) => {
    setRedirects(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Redirect removed!",
      description: "The redirect rule has been deleted.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">Manage your blog configuration and SEO settings</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="seo">SEO Defaults</TabsTrigger>
            <TabsTrigger value="redirects">URL Redirects</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={settings.siteTitle}
                    onChange={(e) => handleSettingsChange('siteTitle', e.target.value)}
                    placeholder="Your blog title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingsChange('siteDescription', e.target.value)}
                    placeholder="Brief description of your blog"
                    rows={3}
                  />
                </div>

                <Button onClick={handleSaveSettings} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Default SEO Settings</CardTitle>
                <p className="text-sm text-gray-600">
                  These defaults will be used for new posts and as fallbacks
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultMetaTitle">Default Meta Title</Label>
                  <Input
                    id="defaultMetaTitle"
                    value={settings.defaultMetaTitle}
                    onChange={(e) => handleSettingsChange('defaultMetaTitle', e.target.value)}
                    placeholder="Default title for search engines"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
                  <Textarea
                    id="defaultMetaDescription"
                    value={settings.defaultMetaDescription}
                    onChange={(e) => handleSettingsChange('defaultMetaDescription', e.target.value)}
                    placeholder="Default description for search engines"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultKeywords">Default Keywords</Label>
                  <Input
                    id="defaultKeywords"
                    value={settings.defaultKeywords}
                    onChange={(e) => handleSettingsChange('defaultKeywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultRobots">Default Robots Tag</Label>
                  <Input
                    id="defaultRobots"
                    value={settings.defaultRobots}
                    onChange={(e) => handleSettingsChange('defaultRobots', e.target.value)}
                    placeholder="index, follow"
                  />
                </div>

                <Button onClick={handleSaveSettings} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save SEO Defaults'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="redirects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>URL Redirects</CardTitle>
                <p className="text-sm text-gray-600">
                  Manage redirects from old URLs to new ones
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add new redirect */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Add New Redirect</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Input
                      placeholder="old-slug"
                      value={newRedirect.oldSlug}
                      onChange={(e) => setNewRedirect(prev => ({ ...prev, oldSlug: e.target.value }))}
                    />
                    <Input
                      placeholder="new-slug"
                      value={newRedirect.newSlug}
                      onChange={(e) => setNewRedirect(prev => ({ ...prev, newSlug: e.target.value }))}
                    />
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newRedirect.type}
                      onChange={(e) => setNewRedirect(prev => ({ ...prev, type: e.target.value as "301" | "302" }))}
                    >
                      <option value="301">301 (Permanent)</option>
                      <option value="302">302 (Temporary)</option>
                    </select>
                    <Button onClick={addRedirect}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* Existing redirects */}
                <div className="space-y-3">
                  <h4 className="font-medium">Existing Redirects</h4>
                  {redirects.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No redirects configured</p>
                  ) : (
                    redirects.map((redirect, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                            /{redirect.oldSlug}
                          </span>
                          <span className="text-center">→</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                            /{redirect.newSlug}
                          </span>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {redirect.type}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeRedirect(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
