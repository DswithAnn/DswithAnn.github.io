+++
title = "CardView Vs MaterialCardView"
date = 2024-11-26T22:22:55+06:00
author = "K M Rejowan Ahmmed"
tags = ["Android", "Material Design", "CardView"]
cover = "/post/cardview_vs_material_cardview/cover.jpg"
summary = "**MaterialCardView** extends **CardView** with extra features like stroke color, checkable state, and customizable ripple effects, making it more suited for modern Android apps following **Material Design** guidelines."
+++

![cover](cover.jpg)

As we're focusing more on design, **Material Design** is a hot topic here. Google's Material Library (`com.google.android.material`) created a huge impact in this area. Today I'm going to discuss one of the most used elements in the design, the **CardView**.

Google has introduced a new version of **CardView** called **MaterialCardView** . Both **CardView** and **MaterialCardView** could be used in the same cases and they look pretty similar. But there is still a vast difference in both design and functionality.

Let's start with some background data about these twos-

## CardView

Previously, **CardView** was provided by **Android Support Library** (`android.support.v7.widget.CardView`). But with the latest migration to **Andoridx**, now it is provided by **Androidx** (`androidx.cardview.widget.CardView`) Library. **CardView** is created by extending the **FrameLayout**.

## MaterialCardView

This is introduced with Google Material Library (`com.google.android.material`). It is provided by **Material Components Library** (`com.google.android.material.card.MaterialCardView`). **MaterialCardView** is created by extending the **CardView**.

## Differences

**MaterialCardView** has all the elements of **CardView** with its extra features. Here is a list containing the differences-

*   *   **Stroke Color** and **Stroke Width** can be added to **MaterialCardView** which wasn't possible using **CardView**.

*   *   **MaterialCardView** is Checkable. Check icon, color, and position can be set in **MaterialCardView**. Check conditions can be called also. This will be really useful as CardView has a huge usage in lists and grids.

*   *   **Ripple Color** can be set to MaterialCardView which is not available in CardView.

## Code Example

**CardView**

```xml
    <androidx.cardview.widget.CardView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:cardBackgroundColor=""
            app:cardCornerRadius=""
            app:cardElevation=""
            app:cardMaxElevation=""
            app:cardPreventCornerOverlap=""
            app:cardUseCompatPadding=""
            app:contentPadding=""
            app:contentPaddingBottom=""
            app:contentPaddingLeft=""
            app:contentPaddingRight=""
            app:contentPaddingTop=""/>
            
```

**MaterialCardView**

```xml
      <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:checkable=""
            android:clickable=""
            android:focusable=""
            app:cardBackgroundColor=""
            app:cardCornerRadius=""
            app:cardElevation=""
            app:cardMaxElevation=""
            app:cardPreventCornerOverlap=""
            app:cardUseCompatPadding=""
            app:checkedIcon=""
            app:checkedIconGravity=""
            app:checkedIconSize=""
            app:contentPadding=""
            app:contentPaddingBottom=""
            app:contentPaddingLeft=""
            app:contentPaddingRight=""
            app:contentPaddingTop=""
            app:strokeColor=""
            app:strokeWidth=""
            app:shapeAppearance=""
            app:cardForegroundColor=""
            app:checkedIconMargin=""
            app:checkedIconTint=""
            app:rippleColor=""
            app:shapeAppearanceOverlay=""
            app:state_dragged="" />
```
## Shots

**CardView**

![cardview](cardview.png)

**MaterialCardview**

![material cardview](material_cardview.png)

## Details

* [CardView docs](https://developer.android.com/reference/androidx/cardview/widget/CardView)

*   [MaterialCardView docs](https://developer.android.com/reference/com/google/android/material/card/MaterialCardView)

*   [MaterialCardView on material.io](https://m2.material.io/develop/android/components/cards/)


## Find me on - 
* [Github](https://github.com/ahmmedrejowan)
* [LinkedIn](https://www.linkedin.com/in/ahmmedrejowan/)

---

Thanks for reading. Have a good day.


