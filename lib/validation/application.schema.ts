import { z } from "zod";

export const createApplicationSchema = z
  .object({
    applicationType: z.enum(["Birth", "Death"]),

    // Birth
    childName: z.string().optional(),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    hospitalName: z.string().optional(),
    dateOfBirth: z.string().optional(),

    // Death
    deceasedName: z.string().optional(),
    dateOfDeath: z.string().optional(),
    placeOfDeath: z.string().optional(),
    causeOfDeath: z.string().optional(),
    address: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.applicationType === "Birth") {
      if (!data.childName) {
        ctx.addIssue({
          code: "custom",
          path: ["childName"],
          message: "Child name is required",
        });
      }

      if (!data.fatherName) {
        ctx.addIssue({
          code: "custom",
          path: ["fatherName"],
          message: "Father name is required",
        });
      }

      if (!data.motherName) {
        ctx.addIssue({
          code: "custom",
          path: ["motherName"],
          message: "Mother name is required",
        });
      }

      if (!data.hospitalName) {
        ctx.addIssue({
          code: "custom",
          path: ["hospitalName"],
          message: "Hospital name is required",
        });
      }

      if (!data.dateOfBirth) {
        ctx.addIssue({
          code: "custom",
          path: ["dateOfBirth"],
          message: "Date of birth is required",
        });
      }
    }

    if (data.applicationType === "Death") {
      if (!data.deceasedName) {
        ctx.addIssue({
          code: "custom",
          path: ["deceasedName"],
          message: "Deceased name is required",
        });
      }

      if (!data.dateOfDeath) {
        ctx.addIssue({
          code: "custom",
          path: ["dateOfDeath"],
          message: "Date of death is required",
        });
      }

      if (!data.placeOfDeath) {
        ctx.addIssue({
          code: "custom",
          path: ["placeOfDeath"],
          message: "Place of death is required",
        });
      }

      if (!data.address) {
        ctx.addIssue({
          code: "custom",
          path: ["address"],
          message: "Address is required",
        });
      }
    }
  });