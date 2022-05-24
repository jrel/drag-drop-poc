import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {
  moveItemInArray,
  CdkDragDrop,
  CdkDragStart,
} from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

/** @title Virtual scroll with view recycling disabled. */
@Component({
  selector: 'cdk-virtual-scroll-append-only-example',
  styleUrls: ['cdk-virtual-scroll-append-only-example.css'],
  templateUrl: 'cdk-virtual-scroll-append-only-example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdkVirtualScrollAppendOnlyExample {
  items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
  @ViewChild('virtualScroller') virtualScroller: CdkVirtualScrollViewport;

log :any[]= [];

  drop(event: CdkDragDrop<string[]>) {
    const vsStartIndex = this.virtualScroller.getRenderedRange().start;
    this.log.push({
      vsStartIndex,
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    });
    moveItemInArray(
      this.items,
      event.previousIndex,
      event.currentIndex + vsStartIndex
    );
    this.items = [...this.items];
  }

  cdkDragConstrainPosition = (point: any, ref: any) => {
    const { start } = this.virtualScroller.getRenderedRange();
    return {
      x: point.x,
      y: point.y + start * 50,
    };
  };
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
