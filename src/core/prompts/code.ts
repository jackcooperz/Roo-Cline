import { Mode, codeMode, defaultPrompts, PromptComponent } from "../../shared/modes"
import { getToolDescriptionsForMode } from "./tools"
import {
    getRulesSection,
    getSystemInfoSection,
    getObjectiveSection,
    getSharedToolUseSection,
    getMcpServersSection,
    getToolUseGuidelinesSection,
    getCapabilitiesSection
} from "./sections"
import { DiffStrategy } from "../diff/DiffStrategy"
import { McpHub } from "../../services/mcp/McpHub"

export const mode: Mode = codeMode

export const CODE_PROMPT = async (
    cwd: string,
    supportsComputerUse: boolean,
    mcpHub?: McpHub,
    diffStrategy?: DiffStrategy,
    browserViewportSize?: string,
    customPrompt?: PromptComponent,
) => `${customPrompt?.roleDefinition || defaultPrompts[codeMode].roleDefinition}

${getSharedToolUseSection()}

${getToolDescriptionsForMode(mode, cwd, supportsComputerUse, diffStrategy, browserViewportSize, mcpHub)}

${getToolUseGuidelinesSection()}

${await getMcpServersSection(mcpHub, diffStrategy)}

${getCapabilitiesSection(cwd, supportsComputerUse, mcpHub, diffStrategy)}

${getRulesSection(cwd, supportsComputerUse, diffStrategy)}

${getSystemInfoSection(cwd)}

${getObjectiveSection()}`
