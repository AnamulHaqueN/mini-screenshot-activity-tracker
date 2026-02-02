import { Youch } from "youch";
import colors from "@poppinss/colors";
import supportsColor from "supports-color";
import { diff } from "jest-diff";
const { columns } = process.stdout;
const ansi = supportsColor.stdout ? colors.ansi() : colors.silent();
const pointer = process.platform === "win32" && !process.env.WT_SESSION ? ">" : "❯";
var ErrorsPrinter = class {
	#options;
	constructor(options) {
		this.#options = {
			stackLinesCount: 5,
			framesMaxLimit: 3,
			...options
		};
	}
	#getPhaseTitle(phase) {
		switch (phase) {
			case "setup": return "Setup hook";
			case "setup:cleanup": return "Setup hook cleanup function";
			case "teardown": return "Teardown hook";
			case "teardown:cleanup": return "Teardown hook cleanup function";
		}
	}
	#parseErrorStack(error) {
		return new Youch().toJSON(error, { frameSourceBuffer: this.#options.stackLinesCount });
	}
	async #parseAssertionError(error) {
		const parsedError = await this.#parseErrorStack(error);
		if (!("showDiff" in error) || error.showDiff) {
			console.error();
			const { actual, expected } = error;
			const diff$1 = diff(expected, actual, {
				expand: true,
				includeChangeCounts: true
			});
			parsedError.message = `${parsedError.message}\n${diff$1}`;
		}
		return parsedError;
	}
	async #displayErrorStack(error) {
		const ansiOutput = await new Youch().toANSI(error, { frameSourceBuffer: this.#options.stackLinesCount });
		console.error(ansiOutput.trimEnd());
	}
	async #displayAssertionError(error) {
		if (!("showDiff" in error) || error.showDiff) {
			console.error();
			const { actual, expected } = error;
			const diff$1 = diff(expected, actual, {
				expand: true,
				includeChangeCounts: true
			});
			console.error(diff$1);
		}
		await this.#displayErrorStack(error);
	}
	printSectionBorder(paging) {
		const border = "─".repeat(columns - (paging.length + 1));
		console.error(ansi.red(`${border}${paging}─`));
	}
	printSectionHeader(title) {
		const whitspacesWidth = (columns - title.length) / 2;
		const [lhsWidth, rhsWidth] = Number.isInteger(whitspacesWidth) ? [whitspacesWidth, whitspacesWidth] : [whitspacesWidth - 1, whitspacesWidth + 1];
		const borderLeft = ansi.red("─".repeat(lhsWidth - 1));
		const borderRight = ansi.red("─".repeat(rhsWidth));
		console.error(`${borderLeft}${ansi.bgRed().black(` ${title} `)}${borderRight}`);
	}
	async parseError(error) {
		if (error === null || Array.isArray(error) || typeof error !== "object") return { message: String(error) };
		if ("actual" in error && "expected" in error) return this.#parseAssertionError(error);
		return this.#parseErrorStack(error);
	}
	async printError(error) {
		if (error === null || Array.isArray(error) || typeof error !== "object") {
			console.error(`Error: ${error}`);
			return;
		}
		if ("actual" in error && "expected" in error) {
			await this.#displayAssertionError(error);
			return;
		}
		await this.#displayErrorStack(error);
	}
	async printErrors(errors) {
		const errorsCount = errors.length;
		let index = 0;
		for (let { phase, error, title } of errors) {
			const label = phase === "test" ? title : `${title}: ${this.#getPhaseTitle(phase)}`;
			console.error();
			console.error(`${pointer} ${ansi.underline(label)}`);
			await this.printError(error);
			this.printSectionBorder(`[${++index}/${errorsCount}]`);
		}
	}
};
export { ErrorsPrinter };
