---
title: "Linear Regression 의 의미"
date: 2025-12-31T00:00:00+09:00
draft: false
categories: ["notes"]
tags: ["machine-learning", "statistics", "regression"]
series: ["ml-basics"]
---

> ### $Linear + Regression$

<svg viewBox="0 0 520 300" width="100%" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linear Regression Chart"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-opacity="0.1" stroke-width="1"><line x1="40" y1="50" x2="500" y2="50"/><line x1="40" y1="100" x2="500" y2="100"/><line x1="40" y1="150" x2="500" y2="150"/><line x1="40" y1="200" x2="500" y2="200"/><line x1="100" y1="20" x2="100" y2="250"/><line x1="200" y1="20" x2="200" y2="250"/><line x1="300" y1="20" x2="300" y2="250"/><line x1="400" y1="20" x2="400" y2="250"/></g><line x1="40" y1="250" x2="500" y2="250" stroke="currentColor" stroke-width="2" marker-end="url(#arrow)"/><line x1="40" y1="250" x2="40" y2="20" stroke="currentColor" stroke-width="2" marker-end="url(#arrow)"/><g stroke="currentColor" stroke-width="1" stroke-dasharray="4,2" opacity="0.6"><line x1="90" y1="170" x2="90" y2="180"/><line x1="160" y1="150" x2="160" y2="155"/><line x1="240" y1="120" x2="240" y2="130"/><line x1="320" y1="95" x2="320" y2="105"/><line x1="420" y1="70" x2="420" y2="75"/></g><line x1="40" y1="195" x2="480" y2="55" stroke="currentColor" stroke-width="2.5"/><g fill="currentColor" stroke="currentColor" stroke-width="1" fill-opacity="0.7"><circle cx="90" cy="170" r="4"/><circle cx="160" cy="150" r="4"/><circle cx="240" cy="120" r="4"/><circle cx="320" cy="95" r="4"/><circle cx="420" cy="70" r="4"/></g><text x="490" y="275" font-family="Times New Roman, serif" font-style="italic" font-size="16" fill="currentColor">x</text><text x="10" y="30" font-family="Times New Roman, serif" font-style="italic" font-size="16" fill="currentColor">y</text><text x="380" y="50" font-family="Times New Roman, serif" font-size="14" fill="currentColor">ŷ = β₀ + β₁x</text></svg>

<aside>

#### $Linear - 선형$

입력($x$)와 예측($y$)의 관계를 **직선 형태(선형 결합)** 형태로 가정함

$$
\hat{y} = \beta_0 + \beta_1x
$$

- $x$가 1개면 **직선(line)**, 2개면 3차원에서 **평면(plane)**, 더 많으면 **초평면(hyperplane)**
- $x$에 대해서 **선형**이며, 각 feature가 가중치 $\beta$를 곱해서 더해지는 형태라서 $Linear$임
- 참고로, $y = \beta_0 + \beta_1x + \beta_2x^2$처럼 $x^2$이 들어가면 입력 $x$ 관점에서는 **비선형**이지만, 파라미터 $\beta$에 대해서는 여전히 **선형**이긴 함 → 넓은 의미로는 "선형모델" 범주에 들어가기도 함

</aside>

<aside>

#### $Regression - 회귀$

집값, 온도, 매출처럼 **연속적인 숫자**를 예측

19세기 통계학자 Galton이 부모 키와 자녀의 키 관계를 보다가 극단적인 값들이 **평균 쪽으로 돌아오는 경향**을 발견했고, 이를 **Regression to the mean(평균으로의 회귀)** 라고 부르게 됨

그 흐름에서 연속값 예측 문제 전반을 $regression$이라고 부르게 됨

한국어로는 **'회귀'** 라고 번역이 굳어짐

</aside>