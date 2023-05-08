![next-cms-ghost](https://static.gotsby.org/v1/assets/images/next-ghost.png)

# next-cms-ghost

[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

#### The fastest React frontend for headless Ghost CMS.

Create and publish flaring fast blogs with <i>next-cms-ghost</i>. Powered by the React framework Next.js and content fed by headless Ghost, you'll get a production ready hybrid frontend that combines the best of static and server-rendered sites. Most importantly, your website can be easily distributed globally to be served from the edge. At the same time your content creators can continue to work with the Ghost authoring system they are used to.

&nbsp;

## 🔥 Alternative

Check out [Blogody](https://www.blogody.com) for an integrated solution with all the benefits of this repository included!

&nbsp;

## ✨ Features

<details>
<summary>Ghost CMS integration</summary>
<br />
<ul>
  <li>Supports Ghost `v3` and `v4`</li>
</ul>
</details>
<details>
<summary>Ghost Casper look & feel</summary>
<br />
<ul>
  <li>Infinite scroll</li>
  <li>Fully responsive</li>
  <li>Sticky navigation headers</li>
  <li>Hover on author avatar</li>
  <li>Styled 404 page</li>
  <li>Preview Section in posts</li>
  <li>Sitemap</li>
  <li>RSS feed</li>
  <li>SEO optimized</li>
</ul>
</details>
<details>
<summary>Extened Casper Styles ✨</summary>
<br />
<ul>
  <li>Dark Mode</li>
  <li>Featured posts pinned on top</li>
  <li>Customizable navigation headers</li>
  <li>Zoom images on click to full-screen</li>
  <li>Render GitHub Gists</li>
</ul>
</details>
<details>
<summary>Images with Next/Images 🚀</summary>
<br />
<ul>
  <li>Feature and inline images</li>
  <li>Auto-optimized images</li>
  <li>No content shifts due to consistent placeholders</li>
</ul>
</details>
<details>
<summary>Advanced Routing</summary>
<br />
<ul>
  <li>Auto-detects custom paths</li>
  <li>Configurable collections</li>
</ul>
</details>
<details>
<summary>Developer friendly</summary>
<br />
<ul>
  <li>MIT licenced</li>
  <li>Truly open-source</li>
  <li>Easy to contribute</li>
  <li>Made typesafe with TypeScript</li>
</ul>
</details>
<details>
<summary>Integrated Plugins</summary>
<br />
<ul>
  <li>Member Subscriptions</li>
  <li>Commenting with Commento or Disqus</li>
  <li>Syntax highlighting with PrismJS</li>
  <li>Table Of Contents</li>
  <li>Contact Page with built-in notification service</li>
  <li>Google Analytics</li> 
</ul>
</details>
<details>
<summary>NextJS Features</summary>
<br />
<ul>
  <li>Incremental Regeneration</li>
  <li>Support for Preview</li>
</ul>
</details>

&nbsp;

## 🚀 Performance

![Lighthouse Score](https://static.gotsby.org/v1/assets/images/jamify-lh-scores-light.gif)

<sup>Scores calculated with Lighthouse 6.4.0.</sup>

&nbsp;

## 🏁 Getting Started

```bash
git clone https://github.com/styxlab/next-cms-ghost.git
cd next-cms-ghost
yarn

# Development
yarn dev

# Production
yarn build
```

&nbsp;

## 🌀 NextJS image optimizations

The `IMAGE_DOMAINS` environment variable must contain a comma separated list of all domains that you use for in-sourcing images. For example:

```
IMAGE_DOMAINS=res.cloudinary.com,yoursource.imgix.net
```

> Image optimization is automatically turned off when deploying to Netlify, because it is currently on supported on Netlify.

&nbsp;

## 🌎 Domain Settings

The `SITE_URL` environment variable should be set to the public facing URL of your site, in most cases to your custom domain.

| Key      | Value (example)           |
| -------- | ------------------------- |
| SITE_URL | https://www.your-blog.org |

If you don't specify `SITE_URL`, it will get populated according to the following defaults:

| Platform | System Value | Conditions                                                          |
| -------- | ------------ | ------------------------------------------------------------------- |
| Vercel   | VERCEL_URL   | _Automatically expose System Environment Variables_ must be checked |
| Netlify  | URL          |                                                                     |

In all other cases `SITE_URL` is set to `http://localhost:3000`.

&nbsp;

## 🔑 Ghost Content API keys

All content is sourced from a Ghost CMS. Choose the method according to your build scenario.

### Building locally

Create a new text file `.env.local` in the project root folder with the following content:

```
CMS_GHOST_API_URL=http://localhost:2368
CMS_GHOST_API_KEY=9fccdb0e4ea5b572e2e5b92942
```

Change `CMS_GHOST_API_URL` and `CMS_GHOST_API_KEY` with the values that you can generate in your Ghost Admin under `Integrations`.

### Building with cloud providers

If you build your project with a cloud provider, the best option is to provide the keys with environment variables:

| Key               | Value (example)              |
| ----------------- | ---------------------------- |
| CMS_GHOST_API_URL | https:\/\/your-ghost-cms.org |
| CMS_GHOST_API_KEY | 9fccdb0e4ea5b572e2e5b92942   |

&nbsp;

## 💫 Deploy

For best results, deploying to Vercel is recommended. As an alternative, you can also deploy to Netlify.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fstyxlab%2Fnext-cms-ghost&project-name=next-cms-ghost&repository-name=next-cms-ghost)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/styxlab/next-cms-ghost&utm_source=github)

&nbsp;

## 🤯 Ensure headless mode of Ghost CMS

For best SEO results it is strongly recommended to disable the default Ghost Handlebars theme front-end by selecting the _Make this site private_ flag within your Ghost admin settings.

&nbsp;

## 💣 Reporting issues

Please report all bugs and issues at [next-cms-ghost/issues](https://github.com/styxlab/next-cms-ghost/issues).

&nbsp;