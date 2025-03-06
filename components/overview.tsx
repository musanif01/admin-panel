"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    users: 180,
    orders: 140,
    chefs: 20,
  },
  {
    name: "Feb",
    users: 220,
    orders: 180,
    chefs: 25,
  },
  {
    name: "Mar",
    users: 300,
    orders: 240,
    chefs: 32,
  },
  {
    name: "Apr",
    users: 350,
    orders: 280,
    chefs: 38,
  },
  {
    name: "May",
    users: 420,
    orders: 320,
    chefs: 42,
  },
  {
    name: "Jun",
    users: 500,
    orders: 400,
    chefs: 48,
  },
  {
    name: "Jul",
    users: 580,
    orders: 450,
    chefs: 52,
  },
  {
    name: "Aug",
    users: 650,
    orders: 500,
    chefs: 58,
  },
  {
    name: "Sep",
    users: 700,
    orders: 550,
    chefs: 62,
  },
  {
    name: "Oct",
    users: 730,
    orders: 580,
    chefs: 68,
  },
  {
    name: "Nov",
    users: 800,
    orders: 600,
    chefs: 72,
  },
  {
    name: "Dec",
    users: 850,
    orders: 670,
    chefs: 80,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="chefs" stroke="#ffc658" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

