'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import {
  useAnalyticsOverview,
  useAdAnalytics,
  useAnalyticsTimeSeries,
  useCategoryViewsAnalytics,
  useCompanyViewsAnalytics,
  useLinkClicksAnalytics,
} from '@/hooks/useAnalytics';
import { useContactMessages } from '@/hooks/useContactMessages';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye, MousePointer, FileText, Building2, TrendingUp, FolderOpen, Link2, Search, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 20;

export default function AdminAnalytics() {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Search states
  const [categorySearch, setCategorySearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [linkSearch, setLinkSearch] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  
  // Pagination states
  const [categoryPage, setCategoryPage] = useState(1);
  const [messagePage, setMessagePage] = useState(1);
  const [companyPage, setCompanyPage] = useState(1);
  const [linkPage, setLinkPage] = useState(1);

  const { data: overview, isLoading: overviewLoading } = useAnalyticsOverview(
    `${startDate}T00:00:00`,
    `${endDate}T23:59:59`
  );
  const { data: adAnalytics, isLoading: adLoading } = useAdAnalytics();
  const { data: timeSeries, isLoading: timeSeriesLoading } = useAnalyticsTimeSeries(
    `${startDate}T00:00:00`,
    `${endDate}T23:59:59`
  );
  
  // New analytics hooks
  const { data: categoryViews, isLoading: categoryLoading } = useCategoryViewsAnalytics(categorySearch);
  const { data: companyViews, isLoading: companyLoading } = useCompanyViewsAnalytics(companySearch);
  const { data: linkClicks, isLoading: linkLoading } = useLinkClicksAnalytics(linkSearch);
  const { data: contactMessages, isLoading: messagesLoading } = useContactMessages(messageSearch);

  // Paginate messages
  const paginatedMessages = useMemo(() => {
    if (!contactMessages) return [];
    const start = (messagePage - 1) * ITEMS_PER_PAGE;
    return contactMessages.slice(start, start + ITEMS_PER_PAGE);
  }, [contactMessages, messagePage]);

  const messageTotalPages = contactMessages ? Math.ceil(contactMessages.length / ITEMS_PER_PAGE) : 0;

  // Get unique positions for filter
  const positions = useMemo(() => {
    if (!adAnalytics) return [];
    return [...new Set(adAnalytics.map(ad => ad.position))];
  }, [adAnalytics]);

  // Filter ads by position
  const filteredAds = useMemo(() => {
    if (!adAnalytics) return [];
    if (positionFilter === 'all') return adAnalytics;
    return adAnalytics.filter(ad => ad.position === positionFilter);
  }, [adAnalytics, positionFilter]);

  // Paginate data
  const paginatedCategories = useMemo(() => {
    if (!categoryViews) return [];
    const start = (categoryPage - 1) * ITEMS_PER_PAGE;
    return categoryViews.slice(start, start + ITEMS_PER_PAGE);
  }, [categoryViews, categoryPage]);

  const paginatedCompanies = useMemo(() => {
    if (!companyViews) return [];
    const start = (companyPage - 1) * ITEMS_PER_PAGE;
    return companyViews.slice(start, start + ITEMS_PER_PAGE);
  }, [companyViews, companyPage]);

  const paginatedLinks = useMemo(() => {
    if (!linkClicks) return [];
    const start = (linkPage - 1) * ITEMS_PER_PAGE;
    return linkClicks.slice(start, start + ITEMS_PER_PAGE);
  }, [linkClicks, linkPage]);

  const categoryTotalPages = categoryViews ? Math.ceil(categoryViews.length / ITEMS_PER_PAGE) : 0;
  const companyTotalPages = companyViews ? Math.ceil(companyViews.length / ITEMS_PER_PAGE) : 0;
  const linkTotalPages = linkClicks ? Math.ceil(linkClicks.length / ITEMS_PER_PAGE) : 0;

  // Format date for chart
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get location display text
  const getLocationText = (country: string | null, city: string | null) => {
    if (city && country) return `${city}, ${country}`;
    if (country) return country;
    return 'Worldwide';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track views, clicks, and engagement</p>
      </div>
      {/* Date Range Filter */}
      <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
        <div className="space-y-1">
          <Label htmlFor="start-date">From</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="end-date">To</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40"
          />
        </div>
      </div>
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {overviewLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{overview?.pageViews.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Listing Views</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {overviewLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{overview?.listingViews.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ad Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {overviewLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{overview?.adViews.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ad Clicks (CTR)</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {overviewLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {overview?.adClicks.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({overview?.ctr}%)
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Tabs for different analytics views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Time Series Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Traffic Over Time
              </CardTitle>
              <CardDescription>Daily page views, ad impressions, and clicks</CardDescription>
            </CardHeader>
            <CardContent>
              {timeSeriesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : timeSeries && timeSeries.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate} 
                      fontSize={12}
                      className="text-muted-foreground"
                    />
                    <YAxis fontSize={12} className="text-muted-foreground" />
                    <Tooltip 
                      labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="pageViews" 
                      name="Page Views"
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="adViews" 
                      name="Ad Impressions"
                      stroke="hsl(215, 70%, 50%)" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="adClicks" 
                      name="Ad Clicks"
                      stroke="hsl(142, 70%, 45%)" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No data available for the selected date range
                </p>
              )}
            </CardContent>
          </Card>

          {/* Ad Performance Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Ad Performance
                  </CardTitle>
                  <CardDescription>Views, clicks, and CTR for each ad</CardDescription>
                </div>
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {adLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : filteredAds.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {positionFilter !== 'all' ? (
                    `No ads found for position "${positionFilter}"`
                  ) : (
                    <>
                      No ads have been created yet.{' '}
                      <Link href="/admin/ads" className="text-primary hover:underline">
                        Create your first ad
                      </Link>
                    </>
                  )}
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="text-right">Clicks</TableHead>
                      <TableHead className="text-right">CTR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAds.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{ad.position}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{ad.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{ad.clicks.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={parseFloat(ad.ctr) > 1 ? 'default' : 'secondary'}>
                            {ad.ctr}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Category Views Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    Category Page Views
                  </CardTitle>
                  <CardDescription>Views by category and location, sorted by most views</CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => {
                      setCategorySearch(e.target.value);
                      setCategoryPage(1);
                    }}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {categoryLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : paginatedCategories.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {categorySearch ? 'No matching categories found' : 'No category views recorded yet'}
                </p>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedCategories.map((item, index) => (
                        <TableRow key={`${item.category}-${item.country}-${item.city}-${index}`}>
                          <TableCell className="font-medium">{item.category}</TableCell>
                          <TableCell>{getLocationText(item.country, item.city)}</TableCell>
                          <TableCell className="text-right">{item.views.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {categoryTotalPages > 1 && (
                    <div className="mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCategoryPage((p) => Math.max(1, p - 1))}
                              className={categoryPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <span className="px-4 text-sm text-muted-foreground">
                              Page {categoryPage} of {categoryTotalPages}
                            </span>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCategoryPage((p) => Math.min(categoryTotalPages, p + 1))}
                              className={categoryPage === categoryTotalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Views Tab */}
        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Views
                  </CardTitle>
                  <CardDescription>Views by company, sorted by most views</CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search companies..."
                    value={companySearch}
                    onChange={(e) => {
                      setCompanySearch(e.target.value);
                      setCompanyPage(1);
                    }}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {companyLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : paginatedCompanies.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {companySearch ? 'No matching companies found' : 'No company views recorded yet'}
                </p>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedCompanies.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Link
                              href={`/listing/${item.slug}`}
                              className="font-medium text-primary hover:underline"
                            >
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell className="text-right">{item.views.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {companyTotalPages > 1 && (
                    <div className="mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCompanyPage((p) => Math.max(1, p - 1))}
                              className={companyPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <span className="px-4 text-sm text-muted-foreground">
                              Page {companyPage} of {companyTotalPages}
                            </span>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCompanyPage((p) => Math.min(companyTotalPages, p + 1))}
                              className={companyPage === companyTotalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Link Clicks Tab */}
        <TabsContent value="links">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    Link Clicks
                  </CardTitle>
                  <CardDescription>Website and social media link clicks, sorted by most clicks</CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search companies or links..."
                    value={linkSearch}
                    onChange={(e) => {
                      setLinkSearch(e.target.value);
                      setLinkPage(1);
                    }}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {linkLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : paginatedLinks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {linkSearch ? 'No matching link clicks found' : 'No link clicks recorded yet'}
                </p>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Link Type</TableHead>
                        <TableHead className="text-right">Clicks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLinks.map((item, index) => (
                        <TableRow key={`${item.listingId}-${item.linkType}-${index}`}>
                          <TableCell>
                            <Link
                              href={`/listing/${item.slug}`}
                              className="font-medium text-primary hover:underline"
                            >
                              {item.companyName}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {item.linkType}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{item.clicks.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {linkTotalPages > 1 && (
                    <div className="mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setLinkPage((p) => Math.max(1, p - 1))}
                              className={linkPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <span className="px-4 text-sm text-muted-foreground">
                              Page {linkPage} of {linkTotalPages}
                            </span>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setLinkPage((p) => Math.min(linkTotalPages, p + 1))}
                              className={linkPage === linkTotalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Contact Messages
                  </CardTitle>
                  <CardDescription>Messages sent through the contact form</CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    value={messageSearch}
                    onChange={(e) => {
                      setMessageSearch(e.target.value);
                      setMessagePage(1);
                    }}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {messagesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : paginatedMessages.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {messageSearch ? 'No matching messages found' : 'No messages received yet'}
                </p>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedMessages.map((msg) => (
                        <TableRow key={msg.id}>
                          <TableCell className="font-medium">{msg.listing_name}</TableCell>
                          <TableCell>
                            <div>{msg.sender_name}</div>
                            <div className="text-xs text-muted-foreground">{msg.sender_email}</div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(msg.sent_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {messageTotalPages > 1 && (
                    <div className="mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setMessagePage((p) => Math.max(1, p - 1))}
                              className={messagePage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <span className="px-4 text-sm text-muted-foreground">
                              Page {messagePage} of {messageTotalPages}
                            </span>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setMessagePage((p) => Math.min(messageTotalPages, p + 1))}
                              className={messagePage === messageTotalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
