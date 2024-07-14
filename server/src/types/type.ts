import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  userName: string;
  email: string;
  image: string;
  gender: string;
  _id: string;
  dateOfBirth: Date;
  password: string;
}