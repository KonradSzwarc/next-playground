import type { Configuration, ModuleOptions, RuleSetRule } from 'webpack';

type Rule = NonNullable<ModuleOptions['rules']>[number];

function assertIsDefined<T>(value: T, message: string): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
}

function assertIsRegexp(value: unknown): asserts value is RegExp {
  if (!(value instanceof RegExp)) {
    throw new TypeError(`Expected RegExp type. Got ${typeof test}`);
  }
}

const addRule = (config: Configuration, rule: Rule) => {
  assertIsDefined(config.module?.rules, 'Could not find module rules');

  config.module.rules.push(rule);
};

const isImageLoaderRule = (rule: Rule): rule is RuleSetRule =>
  typeof rule === 'object' && rule.loader === 'next-image-loader';

const getImageLoaderRule = (config: Configuration) => {
  const rule = config.module?.rules?.find(isImageLoaderRule);

  assertIsDefined(rule, 'Could not find image loader rule');

  return rule;
};

const removeSvgFromMatchers = (test: unknown) => {
  assertIsRegexp(test);

  return new RegExp(test.source.replace('|svg', ''));
};

export const addSvgrLoader = (config: Configuration) => {
  const imageLoaderRule = getImageLoaderRule(config);

  imageLoaderRule.test = removeSvgFromMatchers(imageLoaderRule.test);

  addRule(config, {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: /component/,
    use: [
      {
        loader: '@svgr/webpack',
        options: { icon: true, ref: true },
      },
    ],
  });

  addRule(config, {
    ...imageLoaderRule,
    test: /\.svg$/i,
    resourceQuery: { not: /component/ },
  });

  return config;
};
