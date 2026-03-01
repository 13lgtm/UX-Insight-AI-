-- schema.sql
-- Run this in your Supabase SQL Editor to create the required tables

-- 1. Table 'projects'
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title TEXT,
    "desc" TEXT,
    icon TEXT,
    "iconBg" TEXT,
    status TEXT,
    "statusColor" TEXT,
    interviews TEXT,
    date TEXT,
    "isActive" BOOLEAN
);

-- 2. Table 'insights'
CREATE TABLE insights (
    id SERIAL PRIMARY KEY,
    project_id INT8,
    type TEXT,
    severity TEXT,
    title TEXT,
    tags JSONB,
    quote TEXT,
    "personaName" TEXT,
    "personaRole" TEXT
);

-- 3. Table 'transcripts'
CREATE TABLE transcripts (
    id SERIAL PRIMARY KEY,
    project_id INT8,
    speaker TEXT,
    "timeGroup" TEXT,
    text TEXT,
    timestamp INT8
);
