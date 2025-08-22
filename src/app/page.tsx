"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";

// Data yang sama seperti sebelumnya
const projectData = [
  { name: "Jan", orders: 30, sales: 50 },
  { name: "Feb", orders: 60, sales: 80 },
  { name: "Mar", orders: 45, sales: 70 },
  { name: "Apr", orders: 90, sales: 120 },
  { name: "Mei", orders: 20, sales: 10 },
  { name: "Jun", orders: 40, sales: 30 },
  { name: "Jul", orders: 55, sales: 60 },
];

const browserUsage = [
  { name: "Chrome", company: "Google, Inc.", value: "35,502", growth: "+12.75%", trend: "up" },
  { name: "Edge", company: "Microsoft", value: "25,364", growth: "-24.37%", trend: "down" },
  { name: "Firefox", company: "Mozilla", value: "14,635", growth: "+15.63%", trend: "up" },
  { name: "Safari", company: "Apple", value: "35,657", growth: "+12.54%", trend: "up" },
  { name: "Opera", company: "Opera, Inc.", value: "12,563", growth: "-15.12%", trend: "down" },
];

const recentCustomers = [
  { name: "Samantha Melon", id: "#1234", status: "Paid", color: "green" },
  { name: "Allie Grater", id: "#1234", status: "Pending", color: "red" },
  { name: "Gabe Lackmen", id: "#1234", status: "Pending", color: "red" },
  { name: "Manuel Labor", id: "#1234", status: "Paid", color: "green" },
  { name: "Hercules Bing", id: "#1754", status: "Paid", color: "green" },
  { name: "Manuel Labor", id: "#1234", status: "Pending", color: "red" },
];

const tasks = [
  { text: "Accurate information at any given point.", tag: "Today", done: false },
  { text: "Sharing the information with clients.", tag: "Today", done: false },
  { text: "Hearing the information and responding.", tag: "22 hrs", done: false },
  { text: "Setting up and customizing your own sales.", tag: "1 Day", done: false },
  { text: "To have a complete 360° overview of sales.", tag: "2 Days", done: true },
  { text: "Sharing the information with stakeholders.", tag: "Today", done: false },
  { text: "New Admin Launched.", tag: "", done: true },
  { text: "To maximize profits and improve productivity.", tag: "", done: true },
];

const productSummary = [
  { id: "#01", name: "Sean Black", pid: "PRO12345", product: "Mi LED Smart TV 4A 80", cost: "$14,500", pay: "Online", status: "Delivered", color: "green" },
  { id: "#02", name: "Evan Rees", pid: "PRO8765", product: "Thomson R9 Full HD LED TV", cost: "$30,000", pay: "COD", status: "Add Cart", color: "blue" },
  { id: "#03", name: "David Wallace", pid: "PRO54321", product: "Vu 80cm LED TV", cost: "$13,200", pay: "Online", status: "Pending", color: "orange" },
  { id: "#04", name: "Julia Bower", pid: "PRO97654", product: "Micromax 32 inch HD TV", cost: "$15,100", pay: "COD", status: "Delivering", color: "gray" },
  { id: "#05", name: "Kevin James", pid: "PRO4532", product: "HP Wireless Keyboard", cost: "$5,987", pay: "Online", status: "Shipped", color: "red" },
  { id: "#06", name: "Theresa Wright", pid: "PRO6789", product: "Digisol Router", cost: "$11,987", pay: "COD", status: "Delivering", color: "gray" },
  { id: "#07", name: "Sebastian Black", pid: "PRO4567", product: "Dell Wireless Mouse", cost: "$4,700", pay: "Online", status: "Add Cart", color: "blue" },
  { id: "#08", name: "Kevin Glover", pid: "PRO32156", product: "Dell Laptop Backpack", cost: "$678", pay: "COD", status: "Delivered", color: "pink" },
];

const salesActivity = [
  { country: "India", value: "$32,879", percent: 65, color: "bg-blue-500" },
  { country: "Russia", value: "$22,710", percent: 55, color: "bg-cyan-500" },
  { country: "Canada", value: "$56,291", percent: 69, color: "bg-gray-500" },
  { country: "Brazil", value: "$34,209", percent: 60, color: "bg-yellow-500" },
  { country: "United States", value: "$45,870", percent: 86, color: "bg-red-500" },
  { country: "Germany", value: "$67,357", percent: 73, color: "bg-green-500" },
  { country: "U.A.E", value: "$56,291", percent: 69, color: "bg-purple-500" },
];

const warehouseCosts = [
  { name: "Order Picking", value: "3,876", change: "+3%", time: "5 days ago" },
  { name: "Storage", value: "2,178", change: "-16%", time: "2 days ago" },
  { name: "Shipping", value: "1,367", change: "+6%", time: "1 day ago" },
  { name: "Receiving", value: "678", change: "-25%", time: "10 days ago" },
  { name: "Review", value: "578", change: "+55%", time: "11 days ago" },
  { name: "Profit", value: "$27,215", change: "+32%", time: "11 days ago" },
];

const timeline = [
  { name: "Anita Letterback", date: "23 Sep, 2021", text: "Lorem ipsum dolor tempor incididunt.", color: "text-red-400" },
  { name: "Paddy O'Furniture", date: "16 Aug, 2021", text: "Lorem ipsum dolor tempor incididunt.", color: "text-green-400" },
  { name: "Olive Yew", date: "23 Feb, 2021", text: "Lorem ipsum dolor tempor incididunt.", color: "text-blue-400" },
  { name: "Maureen Biologist", date: "21 Jun, 2021", text: "Lorem ipsum dolor tempor incididunt.", color: "text-yellow-400" },
  { name: "Peg Legge", date: "04 Aug, 2021", text: "Lorem ipsum dolor tempor incididunt.", color: "text-teal-400" },
  { name: "Letterbac", date: "04 Aug, 2021", text: "Lorem ipsum dolor tempor incididunt.", color: "text-cyan-400" },
];

const visitorsData = [
  { name: "Mon", male: 200, female: 120 },
  { name: "Tue", male: 180, female: 90 },
  { name: "Wed", male: 250, female: 160 },
  { name: "Thu", male: 300, female: 200 },
  { name: "Fri", male: 280, female: 150 },
  { name: "Sat", male: 200, female: 10 },
  { name: "Sun", male: 290, female: 70 },
];

// Warna untuk status
const statusColors = {
  green: { bg: "bg-green-500/20", text: "text-green-400" },
  red: { bg: "bg-red-500/20", text: "text-red-400" },
  blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
  orange: { bg: "bg-orange-500/20", text: "text-orange-400" },
  gray: { bg: "bg-gray-500/20", text: "text-gray-400" },
  pink: { bg: "bg-pink-500/20", text: "text-pink-400" },
};

// Komponen Progress Bar untuk Sales Activity
const ProgressBar = ({ percent, color }) => {
  return (
    <div className="w-full bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

// Komponen untuk Card Header yang konsisten
const DashboardCard = ({ title, children, className = "" }) => {
  return (
    <Card className={`bg-card border-border ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default function Dashboard({ isSidebarOpen }) {
  const [checked, setChecked] = useState(tasks.map((t) => t.done));
  const [isMobile, setIsMobile] = useState(false);

  // Effect untuk menangani perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  return (
    <div className={`p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Grid Layout Responsif */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Project Budget Chart */}
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
          <DashboardCard title="Project Budget">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      borderRadius: '0.5rem'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#06b6d4" 
                    strokeWidth={2} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#f97316" 
                    strokeWidth={2} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>

        {/* Browser Usage */}
        <div className="md:col-span-1">
          <DashboardCard title="Browser Usage">
            <div className="space-y-4">
              {browserUsage.map((b, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{b.name}</p>
                    <span className="text-xs text-muted-foreground">{b.company}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{b.value}</p>
                    <span className={`text-xs ${b.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {b.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Recent Customers */}
        <div className="md:col-span-1">
          <DashboardCard title="Recent Customers">
            <div className="space-y-3">
              {recentCustomers.map((c, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <span className="text-xs text-muted-foreground">{c.id}</span>
                  </div>
                  <Badge 
                    variant={c.status === "Paid" ? "success" : "destructive"}
                    className="text-xs"
                  >
                    {c.status}
                  </Badge>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Tasks / To-Do List */}
        <div className="md:col-span-2">
          <DashboardCard title="Tasks">
            <div className="space-y-3">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-start justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={checked[i]}
                      onCheckedChange={() => toggleCheck(i)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className={`text-sm ${checked[i] ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.text}
                      </p>
                      {task.tag && (
                        <span className="text-xs text-muted-foreground mt-1 block">{task.tag}</span>
                      )}
                    </div>
                  </div>
                  {task.tag && !checked[i] && (
                    <Badge variant="outline" className="text-xs whitespace-nowrap">
                      {task.tag}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Sales Activity */}
        <div className="md:col-span-2 lg:col-span-1">
          <DashboardCard title="Sales Activity">
            <div className="space-y-4">
              {salesActivity.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{s.country}</span>
                    <span>
                      {s.value} ({s.percent}%)
                    </span>
                  </div>
                  <ProgressBar percent={s.percent} color={s.color} />
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Weekly Visitors */}
        <div className="md:col-span-2">
          <DashboardCard title="Weekly Visitors">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitorsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      borderRadius: '0.5rem'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="male" name="Male" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="female" name="Female" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>

        {/* Warehouse Costs */}
        <div className="md:col-span-2 lg:col-span-1">
          <DashboardCard title="Warehouse Operating Costs">
            <div className="space-y-4">
              {warehouseCosts.map((w, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{w.name}</p>
                    <span className="text-xs text-muted-foreground">{w.time}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{w.value}</p>
                    <span className={`text-xs ${w.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {w.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Timeline */}
        <div className="md:col-span-2 lg:col-span-1">
          <DashboardCard title="Timeline">
            <div className="space-y-4">
              {timeline.map((t, i) => (
                <div key={i} className="relative pl-6 pb-4 border-l-2 border-border last:pb-0">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 mt-1.5"></div>
                  <p className={`text-sm font-medium ${t.color}`}>{t.name}</p>
                  <time className="text-xs text-muted-foreground">{t.date}</time>
                  <p className="text-sm text-foreground mt-1">{t.text}</p>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Product Summary */}
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
          <DashboardCard title="Product Summary">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-accent">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">ID</th>
                    <th className="px-4 py-2 text-left font-medium">Client Name</th>
                    <th className="px-4 py-2 text-left font-medium">Product ID</th>
                    <th className="px-4 py-2 text-left font-medium">Product</th>
                    <th className="px-4 py-2 text-left font-medium">Cost</th>
                    <th className="px-4 py-2 text-left font-medium">Payment</th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {productSummary.map((p, i) => (
                    <tr key={i} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="px-4 py-2">{p.id}</td>
                      <td className="px-4 py-2 font-medium">{p.name}</td>
                      <td className="px-4 py-2">{p.pid}</td>
                      <td className="px-4 py-2">{p.product}</td>
                      <td className="px-4 py-2">{p.cost}</td>
                      <td className="px-4 py-2">{p.pay}</td>
                      <td className="px-4 py-2">
                        <Badge 
                          variant="outline" 
                          className={`${statusColors[p.color]?.bg} ${statusColors[p.color]?.text} border-0`}
                        >
                          {p.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}