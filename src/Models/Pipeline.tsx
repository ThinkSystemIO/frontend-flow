import { TreePipeline } from "../Types";

// Validations
export const pipelineIsValid = (pipeline: TreePipeline) =>
    pipeline !== undefined &&
    pipeline !== null &&
    pipeline.name !== undefined &&
    pipeline.name !== null &&
    pipeline.name !== "" &&
    pipeline.id !== undefined &&
    pipeline.id !== null &&
    pipeline.id !== ""

export const pipelineIsValidAndHasPosition = (pipeline: TreePipeline) =>
    pipelineIsValid(pipeline) &&
    pipelineHasPosition(pipeline)

// Queries
export const pipelineHasPosition = (pipeline: TreePipeline) =>
    pipeline.from !== undefined &&
    pipeline.from !== null &&
    pipeline.from.length === 3 &&
    pipeline.from.every(coordinate => typeof coordinate === "number") &&
    pipeline.to !== undefined &&
    pipeline.to !== null &&
    pipeline.to.length === 3 &&
    pipeline.to.every(coordinate => typeof coordinate === "number");

