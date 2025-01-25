import type {
  FullConfig,
  FullResult,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import type { IFlow, TDocScreenShot, TDocSection } from './utils/types.js';
import { generateHtmlDocs } from './utils/generate-html-docs.js';
import { optimizeImages } from './utils/optimize-images.js';

class MyReporter {
  flows = {} as Record<string, Array<IFlow>>;
  private configuration!: FullConfig;

  onBegin(configuration: FullConfig) {
    this.configuration = configuration;

    if (configuration.projects.length > 1) {
      throw new Error('Multiple projects are not supported.');
    }
    if (!configuration.projects[0]) {
      throw new Error('A project is required.');
    }
  }

  onTestBegin(test: TestCase) {
    console.info(`Starting ${test.title}.`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (
      test.tags.includes('@skip')
      || !test.annotations
      || test.annotations.length === 0) {
      return;
    }

    const annotations = test.annotations[0];
    const steps = result.attachments.map(
      attachment => {
        if (attachment.path?.includes('__section__')) {
          return {
            description: attachment.name || '',
            title: attachment.contentType || '',
            type: 'section',
          } as TDocSection;
        }

        return {
          description: attachment.name || '',
          filepath: attachment.path || '',
          title: attachment.contentType || '',
          type: 'screenshot',
        } as TDocScreenShot;
      }
    );

    const flow: IFlow = {
      group: annotations.type,
      title: test.title,
      description: test.annotations[0]?.description ?? '',
      duration: result.duration,
      steps,
    };

    if (!this.flows[annotations.type]) {
      this.flows[annotations.type] = [];
    }
    this.flows[annotations.type].push(flow);

    console.info(`Finished the test: ${test.title} with status: ${result.status}`);
  }

  async onEnd(result: FullResult) {
    await generateHtmlDocs(this.flows, this.configuration);
    await optimizeImages(this.configuration.projects[0].outputDir);

    console.info(`Finished the run with status: ${result.status}`);
  }
}

export default MyReporter;
