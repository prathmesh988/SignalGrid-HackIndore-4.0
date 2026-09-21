# Introduction

> Source: https://reactbits.dev/get-started/introduction
> React Bits — an open source collection of animated React components.

React Bits is an open-source collection of expressive UI components for adding motion and personality without adopting an entire design system.

Pick a component, tune it in the preview, then copy or install the exact variant for your stack. React Bits makes it easy to be creative, and works great with AI.

## Choose a component

Browse by category or search for the interaction you need.

## Make it yours

Tune the preview and send settings to your usage code.

## Add it to your project

Copy the source or install your chosen variant with the CLI.

## Mission

The goal of React Bits is simple - provide flexible, visually stunning and most importantly, free components that take web projects to the next level.

To make that happen, the project is committed to the following principles:

- **Free For All:** You own the code, and it's free to use in your projects
- **Prop-First Approach:** Easy customization through thoughtfully exposed props
- **Fully Modular:** Install strictly what you need, React Bits is not a dependency
- **Free Choice:** JS or TS, plain CSS or Tailwind, the code is all here

### Free For All

Every component you choose to bring into your project is yours to modify or extend, because you get full visibility of the code, not just an import.

### Prop-First Approach

Every component is designed to be flexible and customizable, with props that allow you to adjust the look and feel without having to always dive into the code.

### Fully Modular

React Bits is not your classic NPM library, you install only the components you need by either copying the code or using the CLI, without pulling in a whole library.

### Free Choice

I don't want to dictate how you build your projects. Whether you prefer JavaScript or TypeScript, plain CSS or Tailwind, it's all here for you to use as you see fit.

P.S. The header has a neat dropdown to help you choose your preferred technologies.

## Performance

While we do everything possible to optimize components and offer the best experience, here are some tips to keep in mind when using React Bits:

- **Less Is More:** Using more than 2-3 components on a page is not advised, it can overload your page with animations, potentially impacting performance or UX
- **Mobile Optimization:** Consider disabling certain effects on mobile and replacing them with static placeholders instead
- **Test Thoroughly:** Your device may be high-end, but be considerate of your users - always test on multiple devices before going live


# Installation

> Source: https://reactbits.dev/get-started/installation
> React Bits — an open source collection of animated React components.

Add React Bits components two ways — copy the source by hand, or pull them in with a CLI. Your choice is saved and used across the site.

## Pick the method

_Selected: **Manual**_

## Steps

Copy a component's source straight into your project.

### 1. Pick a component

Browse the library, open a component you like, and switch to its **Code** tab.

### 2. Set your stack

Choose your language and styling below. Every **Code** tab across the site updates to match, and your choice is remembered on this device.

_Selected stack: **JS + CSS**_

### 3. Copy the code

The **Code** tab now shows the full source for your selected stack — copy it into a new file in your project.

### 4. Install dependencies & use it

If a component relies on external libraries, its **Code** tab lists them. Install what it needs:

```
npm install gsap
```

Then import and render it like any other component:

```
import SplitText from "./SplitText";

<SplitText
  text="Hello, you!"
  delay={100}
  duration={0.6}
/>
```

## That's all!

From here on, it's all about how you integrate the component into your project. The code is yours to play around with — modify styling, functionality, anything goes!
