import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { Server } from './models/server.js';
//import express from 'express';
//const express = require('express');
const server = new Server();

server.listen();

