---
layout: post
title: 개발툴로 애니메이션 성능 조사하기
categories: [Animation]
tags: [Animation, DevTools, Performance]
image: 'https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/devtools-summary-tab.jpg'
---

**원제 : [Investigate animation performance with DevTools](https://calibreapp.com/blog/investigate-animation-performance-with-devtools/?utm_source=CSS-Weekly&utm_campaign=Issue-379&utm_medium=email)**

> 사용자들은 초당 60프레임으로 실행되는 매끄럽고 즐거운 경험을 원합니다. 이를 위해서 브라우저가 코드를 화면에 어떻게 픽셀로 변환되는지와 스타일이 어떻게 프로세스에 영향을 줄 수 있는지 알아야합니다. 

이 게시물에서는 브라우저 렌더링 작동방식과 DevTools로 애니메이션 성능 이슈를 진단하는 방법에 대해 살펴보겠습니다. Chrome DevTools를 사용하지만 다른 브라우저에서도 매우 비슷한 기능을 갖고있고 어디에서나 고급 개념은 동일합니다.

## 렌더링 이해하기(Demystifying rendering)

웹 페이지를 구성하려면, 브라우저는 여러 단계를 거쳐야합니다.

- 파싱(Parsing)
- 스타일 계산(Style calculations)
- 레이아웃(Layout)
- 페인트(Paint)
- 합성(Compositing)

![image](https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/rendering-steps.jpg)

브라우저가 HTML과 CSS를 다운로드하고 **파싱**할 때, DOM(Document Object Model)이 생성됩니다. **스타일을 계산하기위해** 브라우저는 DOM의 모든 요소를 검토하고 스타일시트에 정의된 규칙을 보고 각 요소에 적용될 CSS 속성을 계산합니다. 

DOM과 계산된 스타일을 검사하려면, DevTools의 **Element** 패널을 열고, 해당 요소를 선택한 후 적용된 스타일을 보여주는 **Computed** 섹션을 살펴보세요. 

![image](https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/devtools-elements-tab.jpg)

브라우저가 각 요소에 적용된 스타일을 알고나면, 브라우저는 페이지에 표시해야하는 모든 요소의 크기와 위치를 파악하는 **레이아웃 단계**가 됩니다. 이를 위해 레이아웃 트리(Layout tree)라는 또 다른 트리를 만듭니다. 레이아웃 트리의 요소는 벡터 상자로 표현됩니다.

레이아웃 트리는 DOM을 기반으로하지만, 일반적으로 약간 모양이 다릅니다. DOM에는 모든 HTML 노드가 포함되어있지만 화면에 표시되는 요소만 레이아웃 트리의 일부가 됩니다. 레이아웃 트리에 포함되지 않는 예시는 다음과 같습니다:

- `<head>`
- `<script>`
- `<style>`
- `<div style="display: none">`

레이아웃 트리는 보이는 DOM 요소에 직접 매핑되지 않습니다. 단일 DOM 요소의 텍스트의 큰 단락은 레이아웃 트리에서 여러 상자로 표시됩니다. 레이아웃 트리에는 CSS에 추가된 pseudo 요소도 포함됩니다.(DOM에는 존재하지 않음)

레이아웃 단계에서는 브라우저는 각 상자의 공간과 위치를 계산합니다. 뷰포트 크기와 계산된 스타일을 보면 됩니다. 레이아웃에 영향을 미치는 CSS 일부 속성입니다:

- `height`
- `width`
- `padding`
- `margin`
- 좌표값(`top`, `right`, `bottom`, `left`)

![image](https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/layout-tree.jpg)

레이아웃이 설정되면 브라우저는 **페인팅** 단계로 이동합니다. 벡터 상자를 가져와 픽셀로 바꿉니다.(rasterizing 래스터화라고도 함) 페인트는 개별 레이어로 분리되어 전체페이지를 다시 리페인팅할 필요없이 부분적으로 리페인팅할 수 있습니다. 이것은 애니메이션 맥락을 알 때 특히 유용합니다.

![image](https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/composite.jpg)



## 애니메이션 성능(Animation performance)

애니메이션은 정적인 콘텐츠에 생명을 불어넣고 브랜드 개성을 표현하는데 도움이 됩니다. 사람들은 움직이는 물체에 반응하기 쉬우므로 애니메이션은 상호작용을 좀 더 자연스럽게 해줍니다. 이런 애니메이션은 매끄럽고 페이지가 깨끗해야 합니다. 렌더링 프로세스에 대한 새로운 지식이 코딩에서 최상의 접근 방식을 선택할 수 있도록 도와줍니다.

### Layout and repaints

DOM에서 요소를 추가하거나 제거할때, 해당 요소의 크기나 위치에 애니메이션을 적용하면 브라우저가 문서에서 요소의 위치와 크기를 다시 게산해야합니다. 이것은 레이아웃을 일으킵니다.

> 예를 들어, 요소의 너비를 변경하면 해당 요소의 하위 요소가 영향을 받아 페이지 레이아웃의 대부분이 변경될 수 있습니다. 레이아웃은 거의 항상 문서 전체에 적용되므로 레이아웃 트리가 클수록 레이아웃 계산을 수행하는데 시간이 더 걸립니다.

그리고 항상 페인트가 뒤따릅니다.

화면의 요소가 변경되면 특정 영역을 다시 페인트해야합니다. 그러나 레이아웃 변경으로 인해 항상 리페인팅이 발생하는 것은 아닙니다. 레이아웃에 영향을 주지 않는 방식으로 요소의 모양을 변경할 수 있습니다. 예를 들어 `background color`나 `outline`을 변경한다면, 요소의 크기와 위치가 변경되지 않으므로 브라우저에서 레이아웃을 수행할 필요가 없습니다. 리페인트만 하면 됩니다. 또한 페이지가 레이어로 그려지므로 화면의 일부만 리페인팅하면 됩니다.

다른 CSS 속성 변경이 페인트, 레이아웃, 합성에 어떤 영향을 미치는지 보려면 [CSS Triggers](https://csstriggers.com/)를 확인하십시오.

### Layer and compositing

요소에 애니메이션을 적용할 때는 레이아웃과 리페인팅을 최소화하는 것이 중요합니다. 합성(Compositing) 프로세스를 활용하면 성능이 뛰어난 애니메이션을 만들 수 있습니다.

최신 브라우저는 다음 네 가지를 비용을 절감하여 애니메이션 적용할 수 있습니다. : `position`, `scale`, `rotation`, `opacity` 

| Property |           Value            |
| :------: | :------------------------: |
| Position | Transform: translate(x, y) |
|  Scale   |    transform: scale(n)     |
| Rotation |    transform: rotate()     |
| Opacity  |       Opacity: 0..1        |

브라우저는 이 네가지 속성에서 CSS `transition` 또는 `animation`에 대해 별도의 레이어를 만들어 최적화합니다. 자체 레이어에 애니메이션 요소가 있는 경우, 이동해도 주위 요소 위치에 영향을 미치지 않으며 해당 레이어만 유일하게 이동합니다. 이렇게하면 브라우저가 리페인팅 과정을 피하고 합성 과정만 수행합니다.

합성이 빠른 작업인 이유는 GPU에서 발생하기 때문입니다. GPU는 장치 내부의 별도 컴퓨터와 같습니다. 자체 프로세서와 자체 메모리가 있는 독립형 장치입니다. 그래픽 렌더링에 필요한 복잡한 수학적 계산을 수행하도록 설계되어 있고 이미지를 매우 빠르게 구성할 수 있어 CPU의 부하가 줄어듭니다. 

compositingd을 사용하여 별도 레이어에 있는 요소에 애니메이션을 적용하려면, 브라우저는 애니메이션에 사용되는 CSS 속성을 확인해야합니다.

- 문서 흐름에 영향을 미치지 않는지
- 문서 흐름에 의존하지 않는지
- 리페인팅을 발생시키는지

그렇지않으면 모든 애니메이션 프레임에 대해 브라우저는 요소의 geometry를 다시 계산하고(레이아웃 과정) 페이지의 새로운 상태 이미지를 렌더링하고(리페인팅 과정) GPU에 다시 보내 화면에 표시해야합니다. 별도 레이어에 애니메이션 요소를 적용하면 레이어를 움직이거나 opacity를 변경하기 때문에 GPU가 빛나는 곳입니다.

이를 염두해두고 몇 가지 팁이 있습니다.

- `width`와 `height` 속성을 변경하는 대신에 `transform: scale()`을 사용하세요.
- 요소를 이동시키려면 `top`, `right`, `bottom`, `left`를 변경하지말고 `tranform: translate()`을 사용하세요.
- 배경을 흐리게 하려면 불투명한 이미지를 사용하고 `opacity`를 변경하세요.

Animating elements with transform and opacity aren’t the only reasons for a browser to create separate layers. The way browsers split pages into layers is not standardized, so they can take slightly different approaches based on different heuristics.

애니메이션 속성이 있는 요소와 같이 변경될 가능성이 있는 것은 대개 별도의 레이어를 갖습니다. 서로 다른 텍스트 상자는 서로 제자리에 있을 가능성이 높기 때문에 단일 레이어에 페인트 됩니다.

왜 모든것이 별도 레이어가 아닙니까? 브라우저나 비디오게임과 같은 앱은 마치 외부 장치인것처럼 GPU와 통신해야 합니다. GPU로 객체를 전송하는데 시간이 걸리고 각 레이어마다 메모리 비용이 발생합니다. 이는 저가형 장치에서 특히 문제가 될 수 있으므로 브라우저는 GPU 속도와 처리 비용간의 균형을 유지해야합니다.

## 애니메이션 성능 문제를 확인하기 위한 도구

### Chrome DevTools FPS meter

성공적인 애니메이션 성능 분석 세션을 설정하려면 먼저 **FPS meter**를 활성화하세요.

1. [예제 저장소](https://mihajlija.github.io/super-colorful-square/)로 이동하세요
2. `Command+Option+I`(Mac) 또는 `Control+Shift+I`(Windows, Linux)를 눌러 DevTools를 엽니다.
3. `Command+Shift+P`(Mac) 또는 `Control+Shift+P`(Windows, Linux)를 눌러 Command Menu를 엽니다.
4. Command Menu에서 `Rendering`을 입력하고 **Show Rendering**을 선택하세요.
5. **FPS meter** 체크박스를 선택하세요.

<video width="100%" height="100%" autoplay muted loop><source src="https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/fps-final2.mp4" type="video/mp4"></video>


왼쪽 상단의 상자가 페이지가 실행될 때 FPS에 대한 실시간 예상치를 제공해줍니다. 컴퓨터에서 애니메이션이 60 FPS로 부드럽게 실행될 수 있지만 성능이 떨어지는 장치에서는 어떤 모습입니까?

---

### Chrome DevTools Performance panel

1. [DevTools Jank Sample](https://googlechrome.github.io/devtools-samples/jank/)을 여세요.
2. `Command+Option+I`(Mac) 또는 `Control+Shift+I`(Windows, Linux)를 눌러 DevTools를 엽니다.
3. **Performance** 탭을 엽니다.
4. **Capture Setings**를 클릭하여 조절옵션을 선택하세요.
5. CPU 경우 **6x slowdown**을 선택하세요. DevTools는 CPU를 평소보다 6배 느리게 조절합니다. 
6. FPS 모니터에서 프레임 속도에 어떤 일이 일어나는지 확인하세요.

**Note:** 사용중인 장치에 따라 6x slowdown은 매우 빠를 수 있지만 데모를 사용자 지정하여 컴퓨터에 부담을 주지 않도록 할 수 있습니다. 파란색 사각형이 이전보다 눈에 띄게 느려질 때까지 Add 10을 계속 클릭하세요. 고급 컴퓨터에서는 약 20번의 클릭이 필요할 수도 있습니다.

<video width="100%" height="100%" autoplay muted loop><source src="https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/jankFINAL.mp4" type="video/mp4"></video>


프레임의 속도가 낮거나 고르지 않는 경우, **Performance** 패널을 통해 병목현사을 식별할 수 있습니다. Performance 패널에서 `Command+Shift+E`를 눌러 프로파일링을 시작하고 페이지를 다시 로드하세요.

**Note:** 성능을 측정할 때 시크릿모드 또는 게스트모드에서 Chrome을 엽니다. 이 모드는 Chrome이 깨끗한 상태로 실행되도록 합니다. 예를 들어 많은 익스텐션이 설치된 경우 해당 익스텐션으로 성능 측정에 노이즈가 발생할 수 있습니다.

**Performance** 패널은 브라우저가 수행하는 모든 작업과 수행한 작업에 대한 통찰력을 제공합니다.

<video width="100%" height="100%" autoplay muted loop><source src="https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/perf1.mp4" type="video/mp4"></video>

**Main** 섹션에는 페이지의 주요스레드에서 발생한 활동이 표시되며 작업은 task로 분할됩니다. 여기에는 Javascript 함수 및 브라우저가 페이지를 표시하기 위해 수행하는 내부 작업이 포함됩니다.

Performance 패널의 맨 아래 있는 **Summary** 탭은 모든 작업을 6가지 카테고리로 요약합니다:

- Loading(blue)
- Scripting(yellow)
- Rendering(purple)
- Painting(green)
- System(grey)
- Idle(white)

**Summary** 탭의 색상은 **Main** 섹션의 폭포형 차트의 색상과 동일합니다. 

성능 병목 현상을 확인하려면 **Performance** 패널의 **Timeline** 뷰에서 긴 작업을 찾으세요. 그것들을 붉은 깃발로 표시되어 있으며 그들을 클릭하면 **Summary** 탭에 자세한 내용이 나타납니다.

![image](https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/devtools-summary-tab.jpg)

**Note:** style, layout, paint 모두 Javascript 실행과 함께 브라우저의 기본 스레드에서 발생하므로 애니메이션 성능은 Javascript의 영향을 받을 수 있습니다. 메인스레드가 Javascript를 실행하는데 너무 바쁘면 애니메이션이 고르지 않을 수 있습니다.

렌더링 파이프라인을 기억합니까? 다음과 같습니다.

```
parse -> style -> layout -> paint -> composite
```

애니메이션 성능과 관련된 작업은 보라색(style, layout) 그리고 녹색(painting, compositing)입니다. DevTools에서 위의 각 단계를 식별할 수 있도록 간단한 페이지를 추적하십시오:

1. [이 페이지](https://mihajlija.github.io/hithere/)를 여세요.
2. `Command+Option+I`(Mac) 또는 `Control+Shift+I`(Windows, Linux)를 눌러 DevTools를 여세요.
3. DevTools에서 Performance 탭을 클릭하세요.
4. `Command+Shift+E`를 눌러 profiling을 시작하고 페이지를 다시 로드하세요.

<video width="100%" height="100%" autoplay muted loop><source src="https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/perftracehithere.mp4" type="video/mp4"></video>

확대하면 브라우저가 거치는 별개의 작업이 표시됩니다. 확대하려면 **Overview** 섹션에서 마우스로 Timeline 일부를 선택하세요.

섹션이 선택되면 포인터로 Timeline을 드래그하고 스크롤하여 확대/축소할 수 있습니다. W, A, S, D 키를 사용하여 선택을 조정할 수 있습니다:

- W - zoom in
- S - zoom out
- A - move left
- D - move right

### Chrome DevTools Painting flashing

DevTools에는 애니메이션 문제를 디버그하는데 도움이 되는 페인팅 프로세스를 시각화하는 기능을 갖추고 있습니다. 

1. 빈 페이지를 열고 주소 표시줄에 about:blank를 입력하세요.
2. `Command+Option+I`(Mac) 또는 `Control+Shift+I`(Windows, Linux)를 눌러 DevTools를 엽니다.
3. `Commnad+Shift+P`(Mac) 또는 `Control+Shift+P`(Windows, Linux)를 눌러 Command Menu를 엽니다.
4. `Rendering`을 입력하고 **Show Rendering**을 선택하세요.
5. **Rendering** 탭에서 **Paint flashing**을 활성화합니다.
6. [이 페이지](https://mihajlija.github.io/look/)를 여세요.

<video width="100%" height="100%" autoplay muted loop><source src="https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/paintflashFINAL.mp4" type="video/mp4"></video>

Paint flashing이 활성화된 상태에서 페이지를 로드하면 브라우저의 모든 것이 페인트되어야 하기 때문에 전체화면이 녹색으로 깜박입니다. 페이지가 렌더링된 후에는 페이지의 내용이 변경될 수 있으므로 작업이 수행되지 않습니다. 깜박이는 각 애니메이션은 브라우저가 녹색 사각형으로 표시된 화면의 일부를 페인트하도록 합니다.

레이아웃 및 리페인팅은 성능면에서 비싸고 페이지를 느리게 할 수 있습니다. 만약 paint flasing을 활성화하고 전체화면이 녹색으로 깜박이거나 생각하지도 않은 화면 영역이 페인트되어야한다면, 조금 더 깊게 파고들어야합니다.

### Chrome DevTools Paint Profiler

페인트 프로세스에 대한 자세한 내용은 **Paint profiler**를 확인하십시오.

1. [이 페이지](https://mihajlija.github.io/hithere/)를 여세요.
2. Command+Option+I`(Mac) 또는 `Control+Shift+I`(Windows, Linux)를 눌러 DevTools를 엽니다.
3. DevTools에서 **Performance** 탭을 클릭하고 **Capture settings**를 여세요.
4. **Enable advanced paint instrumentation**을 선택하세요.
5. `Command+Shift+E`를 눌러 **start profiling and reload the page** 하세요.

<video width="100%" height="100%" autoplay muted loop><source src="https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/paintprofileFINAL.mp4" type="video/mp4"></video>

Paint 작업을 클릭하면 **Paint  Profiler** 탭이 나타납니다. 페인트된 내용, 소요시간 및 브라우저가 선택한 페인트에 대해 실행한 개별 그리기 명령(the individual draw commands)을 볼 수 있습니다.

![image](https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/paint-profile.jpg)

이 간단한 페이지를 위해 브라우저는 `drawRect()`으로 바디를 위한 사각형을 그렸고 `drawTextBlob()`으로 "Hi there!"을 그렸습니다.

### Chrome DevTools Layers panel

Layers 패널에서 페이지 레이어가 3D로 어떻게 보이는지 확인할 수 있습니다. DevTools에서 사용하려면 다음을 수행하세요:

1. Commnad+Shift+P`(Mac) 또는 `Control+Shift+P`(Windows, Linux)를 눌러 Command Menu를 엽니다.
2. Command Menu에서 `Layers`를 검색하고 **Show Layers**를 선택하세요.

레이어 모델을 확대, 축소, 회전 및 드래그하여 내용을 탐색할 수 있습니다. 레이어 위로 마우스를 가져가면 페이지에서 현재 위치가 표시됩니다. 레이어를 선택하면 **Details** 패널에 메모리 소비량과 compositing의 이유가 표시됩니다. 레이어의 수를 상대적으로 낮게 유지하고 메모리가 부족한 레이어를 조심하십시오.

<video width="100%" height="100%" autoplay muted loop><source src="https://calibreapp.com/blog/uploads/investigate-animation-performance-with-devtools/layersFINAL.mp4" type="video/mp4"></video>



## 요약

이 렌더링 성능을 조사하기 위한 다양한 도구를 알고있으므로 페이지를 계속해서 최적화하세요. 애니메이션으로 인해 성능 문제가 발생하지 않으려면 주어진 CSS 속성에 애니메이션 효과를 주는 방향을 고려하세요. 레이아웃 재계산을 피하고 리페인팅을 최소화하세요. 가능하면 `transform`과 `opacity`를 고수하세요.

Happy Coding! 👋







