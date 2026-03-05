import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Trash2, CheckCircle2, XCircle, Upload, BookOpen, Award, Tag, Users, FileText, MessageSquare, HelpCircle } from "lucide-react";

const AdminPage = () => {
  const { hasRole } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [certRequests, setCertRequests] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [infoRequests, setInfoRequests] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New course form
  const [newCourse, setNewCourse] = useState({ title: "", slug: "", description: "", base_price: 0, duration: "", level: "beginner", category_id: "" });
  const [newCoupon, setNewCoupon] = useState({ code: "", discount_percent: 10, max_uses: 100 });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    const [coursesR, catsR, couponsR, certReqR, enrollR, infoR, reviewsR] = await Promise.all([
      supabase.from("courses").select("*, categories(name), vendors(name)").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("coupons").select("*").order("created_at", { ascending: false }),
      supabase.from("certificate_requests").select("*, certificates(certificate_number, status, courses(title))").order("created_at", { ascending: false }),
      supabase.from("enrollments").select("*, courses(title), profiles!enrollments_user_id_fkey(full_name)").order("enrolled_at", { ascending: false }).limit(50),
      supabase.from("information_requests").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("reviews").select("*, courses(title)").order("created_at", { ascending: false }).limit(50),
    ]);
    setCourses(coursesR.data || []);
    setCategories(catsR.data || []);
    setCoupons(couponsR.data || []);
    setCertRequests(certReqR.data || []);
    setEnrollments(enrollR.data || []);
    setInfoRequests(infoR.data || []);
    setReviews(reviewsR.data || []);
    setLoading(false);
  };

  const handleAddCourse = async () => {
    if (!newCourse.title || !newCourse.slug) { toast.error("Title and slug required"); return; }
    const { error } = await supabase.from("courses").insert([{ ...newCourse, base_price: Number(newCourse.base_price), level: newCourse.level as any }]);
    if (error) toast.error(error.message);
    else { toast.success("Course added!"); setNewCourse({ title: "", slug: "", description: "", base_price: 0, duration: "", level: "beginner", category_id: "" }); loadAll(); }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); loadAll(); }
  };

  const handleVerifyCert = async (requestId: string, certId: string, action: "approved" | "rejected") => {
    await supabase.from("certificate_requests").update({ status: action }).eq("id", requestId);
    if (action === "approved") {
      await supabase.from("certificates").update({ status: "verified" }).eq("id", certId);
    }
    toast.success(`Certificate ${action}`);
    loadAll();
  };

  const handleAddCoupon = async () => {
    if (!newCoupon.code) { toast.error("Code required"); return; }
    const { error } = await supabase.from("coupons").insert([newCoupon]);
    if (error) toast.error(error.message); else { toast.success("Coupon created"); setNewCoupon({ code: "", discount_percent: 10, max_uses: 100 }); loadAll(); }
  };

  const handleDeleteCoupon = async (id: string) => {
    await supabase.from("coupons").delete().eq("id", id);
    toast.success("Coupon deleted"); loadAll();
  };

  const handleApproveReview = async (id: string, approved: boolean) => {
    await supabase.from("reviews").update({ is_approved: approved }).eq("id", id);
    toast.success(approved ? "Review approved" : "Review hidden"); loadAll();
  };

  const handleFileUpload = async (courseId: string, field: "brochure_url" | "roadmap_url", file: File) => {
    const ext = file.name.split(".").pop();
    const path = `${courseId}/${field}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("course-files").upload(path, file, { upsert: true });
    if (uploadError) { toast.error("Upload failed: " + uploadError.message); return; }
    const { data: urlData } = supabase.storage.from("course-files").getPublicUrl(path);
    await supabase.from("courses").update({ [field]: urlData.publicUrl }).eq("id", courseId);
    toast.success("File uploaded!"); loadAll();
  };

  if (!hasRole("admin")) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="font-display text-3xl font-bold mb-6">Admin Panel</h1>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-card border border-border/50 p-1 rounded-xl flex-wrap h-auto gap-1">
            <TabsTrigger value="courses" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><BookOpen className="h-4 w-4 mr-1.5" />Courses</TabsTrigger>
            <TabsTrigger value="certificates" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Award className="h-4 w-4 mr-1.5" />Certificates</TabsTrigger>
            <TabsTrigger value="coupons" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Tag className="h-4 w-4 mr-1.5" />Coupons</TabsTrigger>
            <TabsTrigger value="enrollments" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Users className="h-4 w-4 mr-1.5" />Enrollments</TabsTrigger>
            <TabsTrigger value="inquiries" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><FileText className="h-4 w-4 mr-1.5" />Inquiries</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><MessageSquare className="h-4 w-4 mr-1.5" />Reviews</TabsTrigger>
          </TabsList>

          {/* COURSES TAB */}
          <TabsContent value="courses" className="space-y-6">
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2"><Plus className="h-5 w-5" /> Add New Course</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1.5"><Label>Title *</Label><Input value={newCourse.title} onChange={e => setNewCourse(p => ({ ...p, title: e.target.value }))} className="bg-muted border-border/50" /></div>
                <div className="space-y-1.5"><Label>Slug *</Label><Input value={newCourse.slug} onChange={e => setNewCourse(p => ({ ...p, slug: e.target.value }))} placeholder="e.g. az-104" className="bg-muted border-border/50" /></div>
                <div className="space-y-1.5"><Label>Price ($)</Label><Input type="number" value={newCourse.base_price} onChange={e => setNewCourse(p => ({ ...p, base_price: Number(e.target.value) }))} className="bg-muted border-border/50" /></div>
                <div className="space-y-1.5"><Label>Duration</Label><Input value={newCourse.duration} onChange={e => setNewCourse(p => ({ ...p, duration: e.target.value }))} placeholder="e.g. 5 Days" className="bg-muted border-border/50" /></div>
                <div className="space-y-1.5">
                  <Label>Level</Label>
                  <select value={newCourse.level} onChange={e => setNewCourse(p => ({ ...p, level: e.target.value }))} className="w-full h-10 rounded-md bg-muted border border-border/50 px-3 text-sm">
                    <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option><option value="expert">Expert</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <select value={newCourse.category_id} onChange={e => setNewCourse(p => ({ ...p, category_id: e.target.value }))} className="w-full h-10 rounded-md bg-muted border border-border/50 px-3 text-sm">
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4 space-y-1.5"><Label>Description</Label><Textarea value={newCourse.description} onChange={e => setNewCourse(p => ({ ...p, description: e.target.value }))} className="bg-muted border-border/50" /></div>
              <Button onClick={handleAddCourse} className="mt-4 bg-gradient-primary text-accent-foreground"><Plus className="h-4 w-4 mr-1.5" /> Add Course</Button>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-lg font-semibold">All Courses ({courses.length})</h2>
              {courses.map(c => (
                <div key={c.id} className="bg-card border border-border/50 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm truncate">{c.title}</h3>
                    <p className="text-xs text-muted-foreground">{c.categories?.name} · ${c.base_price} · {c.level}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* File uploads */}
                    <label className="cursor-pointer">
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={e => e.target.files?.[0] && handleFileUpload(c.id, "brochure_url", e.target.files[0])} />
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"><Upload className="h-3.5 w-3.5" />Brochure</span>
                    </label>
                    <label className="cursor-pointer">
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={e => e.target.files?.[0] && handleFileUpload(c.id, "roadmap_url", e.target.files[0])} />
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"><Upload className="h-3.5 w-3.5" />Roadmap</span>
                    </label>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCourse(c.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* CERTIFICATES TAB */}
          <TabsContent value="certificates" className="space-y-4">
            <h2 className="font-display text-lg font-semibold">Certificate Verification Requests</h2>
            {certRequests.length === 0 ? (
              <div className="bg-card border border-border/50 rounded-xl p-8 text-center text-muted-foreground">No pending requests.</div>
            ) : (
              certRequests.map(req => (
                <div key={req.id} className="bg-card border border-border/50 rounded-xl p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{req.certificates?.certificate_number}</p>
                    <p className="text-xs text-muted-foreground">{req.certificates?.courses?.title}</p>
                    <Badge variant={req.status === "approved" ? "default" : req.status === "rejected" ? "destructive" : "secondary"} className="mt-1 text-xs">{req.status}</Badge>
                  </div>
                  {req.status === "pending" && (
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" onClick={() => handleVerifyCert(req.id, req.certificate_id, "approved")} className="bg-primary text-primary-foreground"><CheckCircle2 className="h-4 w-4 mr-1" />Verify</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleVerifyCert(req.id, req.certificate_id, "rejected")}><XCircle className="h-4 w-4 mr-1" />Reject</Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>

          {/* COUPONS TAB */}
          <TabsContent value="coupons" className="space-y-6">
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Create Coupon</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5"><Label>Code *</Label><Input value={newCoupon.code} onChange={e => setNewCoupon(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="SAVE20" className="bg-muted border-border/50" /></div>
                <div className="space-y-1.5"><Label>Discount %</Label><Input type="number" value={newCoupon.discount_percent} onChange={e => setNewCoupon(p => ({ ...p, discount_percent: Number(e.target.value) }))} className="bg-muted border-border/50" /></div>
                <div className="space-y-1.5"><Label>Max Uses</Label><Input type="number" value={newCoupon.max_uses} onChange={e => setNewCoupon(p => ({ ...p, max_uses: Number(e.target.value) }))} className="bg-muted border-border/50" /></div>
              </div>
              <Button onClick={handleAddCoupon} className="mt-4 bg-gradient-primary text-accent-foreground"><Plus className="h-4 w-4 mr-1.5" /> Create Coupon</Button>
            </div>
            <div className="space-y-3">
              {coupons.map(c => (
                <div key={c.id} className="bg-card border border-border/50 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono font-bold text-sm">{c.code}</p>
                    <p className="text-xs text-muted-foreground">{c.discount_percent}% off · {c.current_uses}/{c.max_uses || "∞"} uses</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCoupon(c.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ENROLLMENTS TAB */}
          <TabsContent value="enrollments" className="space-y-3">
            <h2 className="font-display text-lg font-semibold">Recent Enrollments</h2>
            {enrollments.map(e => (
              <div key={e.id} className="bg-card border border-border/50 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{e.courses?.title}</p>
                  <p className="text-xs text-muted-foreground">{e.profiles?.full_name || "User"} · {e.status} · {e.progress}%</p>
                </div>
                <Badge variant={e.status === "completed" ? "default" : "secondary"} className="text-xs">{e.status}</Badge>
              </div>
            ))}
          </TabsContent>

          {/* INQUIRIES TAB */}
          <TabsContent value="inquiries" className="space-y-3">
            <h2 className="font-display text-lg font-semibold">Information Requests</h2>
            {infoRequests.map(r => (
              <div key={r.id} className="bg-card border border-border/50 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">{r.full_name}</p>
                    <p className="text-xs text-muted-foreground">{r.business_email} · {r.phone || "N/A"}</p>
                    <p className="text-xs text-muted-foreground mt-1">{r.request_type} · {r.course_name || "General"}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{r.request_type}</Badge>
                </div>
                {r.description && <p className="text-sm text-muted-foreground mt-2 border-t border-border/50 pt-2">{r.description}</p>}
              </div>
            ))}
          </TabsContent>

          {/* REVIEWS TAB */}
          <TabsContent value="reviews" className="space-y-3">
            <h2 className="font-display text-lg font-semibold">Student Reviews</h2>
            {reviews.map(r => (
              <div key={r.id} className="bg-card border border-border/50 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{r.courses?.title}</p>
                  <p className="text-xs text-muted-foreground">{"⭐".repeat(r.rating)} · {r.comment?.substring(0, 80)}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant={r.is_approved ? "default" : "outline"} onClick={() => handleApproveReview(r.id, !r.is_approved)}>
                    {r.is_approved ? "Hide" : "Approve"}
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
