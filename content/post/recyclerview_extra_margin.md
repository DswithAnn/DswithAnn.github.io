+++
title = "RecyclerView Last Item Extra Bottom Margin"
date = 2024-10-27T22:17:19+06:00
lastmod = 2024-10-26T22:17:19+06:00
author = "K M Rejowan Ahmmed"
tags = ["Android", "RecyclerView", "Extra Margin", "Java"]
cover = "/post/recyclerview_extra_margin/cover.jpg"
summary = "Add extra bottom margin to the last item in a RecyclerView by modifying LayoutParams in onBindViewHolder(). Adjust margins for the last item and others using conditional logic for a clean, customized UI."
+++

![cover](cover.jpg)

## RecyclerView Last Item Extra Bottom Margin

**RecyclerView** is a staple in Android app development, and often, we need to add customizations. One common requirement is adding extra bottom margin for the last item in the RecyclerView. Let’s explore an efficient solution for this.

---

## Solution

A great way to achieve this is by utilizing `LayoutParams` in the adapter's `onBindViewHolder()` method. This approach allows setting unique parameters for the last item, such as an extra bottom margin, while keeping the rest of the items consistent.

---

## Example Code

```java
@Override
public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
    if (position == list.size() - 1) {
        // Set extra bottom margin for the last item
        RecyclerView.LayoutParams params = (RecyclerView.LayoutParams) holder.itemView.getLayoutParams();
        params.bottomMargin = 150; // Last item bottom margin
        holder.itemView.setLayoutParams(params);
    } else {
        // Set regular bottom margin for other items
        RecyclerView.LayoutParams params = (RecyclerView.LayoutParams) holder.itemView.getLayoutParams();
        params.bottomMargin = 10; // Other items bottom margin
        holder.itemView.setLayoutParams(params);
    }

    // Other binding logic here...
}
```

---

## Explanation

- The condition `position == list.size() - 1` identifies the last item in the list.
- Using `LayoutParams`, we adjust the `bottomMargin` for the last item to **150dp** while keeping other items at **10dp**.
- This simple logic ensures the last item stands out with additional spacing at the bottom.

---

Now you know how to add an extra bottom margin to the last item in a RecyclerView seamlessly!

---

**Find me on:**
- [GitHub](https://github.com/ahmmedrejowan)
- [Facebook](https://www.facebook.com/ahmmedrejowan)  