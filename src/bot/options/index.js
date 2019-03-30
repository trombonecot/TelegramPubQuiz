import { ask } from '../actions/index';

export const options = [
    {
        name: "ask",
        type: "command",
        description: "I'll question you about capitals!",
        action: ask
    }
];