import React, { useEffect, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PackageChecker.module.scss";
let actualJSON = require("../../package.json");

interface PackageCheckerProps {
  className?: string;
}

const baselineValues = {
  name: "advancedfrontend",
  version: "1.0.0",
  description: "",
  main: "index.js",
  scripts: {
    start: "webpack serve --env port=3000",
    prodBuild: "webpack --env mode=production",
    devBuild: "webpack --env mode=development",
    fixLint: 'eslint "**/*.{ts, tsx}"',
    test: "jest --config ./config/jest/jest.config.ts",
  },
  devDependencies: {
    "@babel/core": "^7.17.5",
    "@babel/preset-env": "^7.16.11",
    "@babel/preset-react": "^7.16.7",
    "@babel/preset-typescript": "^7.22.5",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.5",
    "@storybook/addon-actions": "^6.4.19",
    "@storybook/addon-essentials": "^6.4.19",
    "@storybook/addon-interactions": "^6.4.19",
    "@storybook/addon-links": "^6.4.19",
    "@storybook/blocks": "^7.0.27",
    "@storybook/builder-webpack5": "^6.4.19",
    "@storybook/manager-webpack5": "^6.4.19",
    "@storybook/react": "^6.4.19",
    "@storybook/react-webpack5": "^7.0.27",
    "@storybook/testing-library": "^0.0.9",
    "@svgr/webpack": "^6.2.1",
    "@testing-library/jest-dom": "^5.16.2",
    "@testing-library/react": "^12.1.3",
    "@types/jest": "^27.4.1",
    "@types/node": "^17.0.21",
    "@types/react": "^17.0.39",
    "@types/react-dom": "^17.0.11",
    "@types/react-router-dom": "^5.3.3",
    "@types/webpack": "^5.28.0",
    "@types/webpack-bundle-analyzer": "^4.4.1",
    "@types/webpack-dev-server": "^4.7.2",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "babel-loader": "^8.2.3",
    "babel-plugin-i18next-extract": "^0.8.3",
    "copy-webpack-plugin": "^10.2.4",
    "css-loader": "^6.6.0",
    eslint: "^8.44.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-xo": "^0.43.1",
    "eslint-config-xo-typescript": "^0.57.0",
    "eslint-plugin-i18next": "^5.2.1",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    husky: "^7.0.0",
    "identity-obj-proxy": "^3.0.0",
    jest: "^27.5.1",
    "json-server": "^0.17.0",
    loki: "^0.28.1",
    "mini-css-extract-plugin": "^2.5.3",
    "react-refresh": "^0.12.0",
    "reg-cli": "^0.17.6",
    "regenerator-runtime": "^0.13.9",
    sass: "^1.49.9",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    stylelint: "^14.5.3",
    "stylelint-config-standard-scss": "^3.0.0",
    "ts-loader": "^9.2.6",
    "ts-node": "^10.5.0",
    typescript: "^4.5.5",
    webpack: "^5.69.1",
    "webpack-bundle-analyzer": "^4.5.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4",
  },
  dependencies: {
    "@reduxjs/toolkit": "^1.8.0",
    axios: "^0.26.1",
    concurrently: "^7.0.0",
    i18next: "^21.6.11",
    "i18next-browser-languagedetector": "^6.1.3",
    "i18next-http-backend": "^1.3.2",
    react: "^17.0.2",
    "react-dom": "^17.0.2",
    "react-i18next": "^11.15.5",
    "react-redux": "^7.2.6",
    "react-router-dom": "^6.2.1",
  },
  keywords: [],
  author: "",
  license: "ISC",
};

type DifferenceType = "added" | "changed" | "removed";

// @ts-ignore
function findObjectDifferences(
  prevObj: any,
  newObj: any
): { type: DifferenceType; value: string }[] {
  const differences: { type: DifferenceType; value: string }[] = [];

  // Iterate over the properties of newObj
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      // Check if the property exists in prevObj
      if (!prevObj.hasOwnProperty(key)) {
        // Property is added in newObj
        differences.push({
          type: "added",
          value: `Added property: '${key}' with value '${newObj[key]}'`,
        });
      } else if (
        typeof newObj[key] === "object" &&
        typeof prevObj[key] === "object"
      ) {
        // @ts-ignore
        const objectDifferences = findObjectDifferences(
          prevObj[key],
          newObj[key]
        );
        differences.push(
          //@ts-ignore
          ...objectDifferences.map((diff) => ({
            type: "changed",
            value: `Changed value of property: '${key}.${diff.value} '`,
          }))
        );
      } else if (newObj[key] !== prevObj[key]) {
        // Property value is different in newObj
        differences.push({
          type: "changed",
          value: `Changed value of property: '${key}' from '${prevObj[key]}' to '${newObj[key]} '`,
        });
      }
    }
  }

  // Iterate over the properties of prevObj
  for (const key in prevObj) {
    if (prevObj.hasOwnProperty(key)) {
      // Check if the property is missing in newObj
      if (!newObj.hasOwnProperty(key)) {
        // Property is removed in newObj
        differences.push({
          //@ts-ignore
          type: "removed",
          value: `Removed property: '${key}' with value '${prevObj[key]} '`,
        });
      }
    }
  }

  return differences;
}

const PackageChecker: React.FC<PackageCheckerProps> = ({ className }) => {
  const [differences, setDifferences] = useState<
    { type: DifferenceType; value: string }[]
  >([]);

  useEffect(() => {
    //@ts-ignore
    setDifferences(findObjectDifferences(baselineValues, actualJSON));
  }, []);

  return (
    <div className={classNames(cls.pckg, {}, [className as string])}>
      <h1>Data Differences</h1>
      <div className="chat">
        {differences.map((difference, index) => (
          <div key={index} className={cls[difference.type]}>
            {difference.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageChecker;
