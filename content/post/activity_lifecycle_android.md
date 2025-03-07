+++
title = "Android Activity Lifecycle: A Comprehensive Guide"
date = 2024-11-18T22:47:05+06:00
lastmod = 2024-11-26T23:30:05+06:00
author = "K M Rejowan Ahmmed"
pin = true
tags = ["Android", "Lifecycle"]
cover = "/post/activity_lifecycle_android/cover.jpg"
summary = "The Android activity lifecycle manages the states an activity goes through, from creation to destruction, enabling efficient resource management and seamless user experience."
+++

![cover](cover.jpg)


## Introduction

When developing Android applications, understanding the lifecycle of an activity is crucial. The
activity lifecycle refers to the series of states an activity goes through, from creation to
destruction. By understanding this lifecycle, developers can effectively manage resources, handle
user interactions, and ensure a seamless user experience. In this blog post, we will dive deep into
the Android activity lifecycle, exploring each state and its significance.

## What is Activity Lifecycle?

The activity lifecycle consists of various states that an activity transitions through during its
lifespan. These states include:

1. **`onCreate()`**: This method is called when the activity is first created. It is typically used
   to initialize essential components, such as UI elements and variables.

2. **`onStart()`**: After `onCreate()`, the activity enters the `started` state. Here, the activity
   becomes visible to the user, but it may not be in the foreground.

3. **`onResume()`**: The `resumed` state indicates that the activity is now in the foreground and
   ready to interact with the user. This is where animations, music playback, and other foreground
   operations are typically started.

4. **`onPause()`**: When an activity loses focus but remains visible, it enters the `paused` state.
   This can happen when another activity is launched in front of it or when the device enters a
   multi-window mode.

5. **`onStop()`**: The `stopped` state occurs when the activity is no longer visible to the user.
   This can happen when the user navigates to another activity or when the activity is destroyed.

6. **`onRestart()`**: If an activity was stopped and then restarted, the `onRestart()` method is
   called before `onStart()`. It allows the activity to prepare for being visible to the user again.

7. **`onDestroy()`**: The `destroyed` state indicates that the activity is about to be destroyed and
   removed from memory. This is the final opportunity to release any resources or perform cleanup
   operations.

## Lifecycle with Example Codes

Now let's explore each lifecycle method in detail, accompanied by example code snippets and
corresponding log outputs.

### `onCreate()`

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    Log.d("Lifecycle", "onCreate() called");
}
```

Log Output:

```
Lifecycle: onCreate() called
```

### `onStart()`

```java
@Override
protected void onStart() {
    super.onStart();
    Log.d("Lifecycle", "onStart() called");
}
```

Log Output:

```
Lifecycle: onStart() called
```

### `onResume()`

```java
@Override
protected void onResume() {
    super.onResume();
    Log.d("Lifecycle", "onResume() called");
}
```

Log Output:

```
Lifecycle: onResume() called
```

### `onPause()`

```java
@Override
protected void onPause() {
    super.onPause();
    Log.d("Lifecycle", "onPause() called");
}
```

Log Output:

```
Lifecycle: onPause() called
```

### `onStop()`

```java
@Override
protected void onStop() {
    super.onStop();
    Log.d("Lifecycle", "onStop() called");
}
```

Log Output:

```
Lifecycle: onStop() called
```

### `onRestart()`

```java
@Override
protected void onRestart() {
    super.onRestart();
    Log.d("Lifecycle", "onRestart() called");
}
```

Log Output:

```
Lifecycle: onRestart() called
```

### `onDestroy()`

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    Log.d("Lifecycle", "onDestroy() called");
}
```

Log Output:

```
Lifecycle: onDestroy() called
```

## Full Code of an Activity with All Lifecycle Methods

Here's an example of a complete activity class that demonstrates all the lifecycle methods:

```java
public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Log.d(TAG, "onCreate() called");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(TAG, "onStart() called");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "onResume() called");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "onPause() called");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, "onStop() called");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d(TAG, "onRestart() called");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy() called");
    }
}
```

## Comparison Table of Activity Lifecycle Methods

| Lifecycle Method | Description                                                                |
|------------------|----------------------------------------------------------------------------|
| `onCreate()`     | Called when the activity is first created.                                 |
| `onStart()`      | Called when the activity becomes visible to the user.                      |
| `onResume()`     | Called when the activity is in the foreground and ready to interact.       |
| `onPause()`      | Called when the activity loses focus but remains visible.                  |
| `onStop()`       | Called when the activity is no longer visible to the user.                 |
| `onRestart()`    | Called when a stopped activity is about to be restarted.                   |
| `onDestroy()`    | Called when the activity is about to be destroyed and removed from memory. |

## Importance of Using Activity Lifecycle

1. **Resource Management**: By properly handling lifecycle methods, you can efficiently manage
   resources like memory, CPU, and network connections.

2. **State Preservation**: Lifecycle methods allow you to save and restore the state of your
   activity.

3. **User Experience**: Managing the activity lifecycle ensures a smooth user experience.

## Best Practices for Using Activity Lifecycle

1. **Avoid Lengthy Operations**: Perform heavy operations, such as network requests, in background
   threads.

2. **Save and Restore State**: Preserve important data during configuration changes.

3. **Release Resources**: Unregister receivers, release references to objects, and clean up
   resources.

4. **Test Different Scenarios**: Test your app under various scenarios.

Refer to the
official [Android Activity Lifecycle documentation](https://developer.android.com/guide/components/activities/activity-lifecycle)
for more information.

